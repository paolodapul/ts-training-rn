// Define the basic structure for our content types
interface BaseContent {
  id: string;
  title: string;
  created: Date;
}

interface Article extends BaseContent {
  body: string;
  tags: string[];
}

interface Image extends BaseContent {
  url: string;
  altText: string;
}

interface Video extends BaseContent {
  url: string;
  duration: number;
}

// Union type for all content types
type Content = Article | Image | Video;

// Conditional type to extract fields based on content type
type ExtractFields<
  T extends Content,
  K extends keyof BaseContent
> = T extends any ? Omit<T, K> : never;

// Type guard to check if content is of a specific type
function isArticle(content: Content): content is Article {
  return (content as Article).body !== undefined;
}

// Mapped type to make all fields of a type readonly
type Immutable<T> = {
  readonly [K in keyof T]: T[K];
};

// Function to create immutable content
function freezeContent<T extends Content>(content: T): Immutable<T> {
  return Object.freeze(content) as Immutable<T>;
}

// Template literal type for content actions
type ContentAction =
  | `${"create" | "update" | "delete"}_article`
  | `${"create" | "update" | "delete"}_image`
  | `${"create" | "update" | "delete"}_video`;

type ActionContentMap = {
  create_article: Article;
  update_article: Article;
  delete_article: Article;
  create_image: Image;
  update_image: Image;
  delete_image: Image;
  create_video: Video;
  update_video: Video;
  delete_video: Video;
};

function performAction<T extends ContentAction>(
  action: T,
  content: ActionContentMap[T]
): void {
  console.log(`Performing action: ${action}`);

  switch (action) {
    case "create_article":
    case "update_article":
    case "delete_article":
      if (isArticle(content)) {
        console.log(`Article: ${content.title}`);
        console.log(`Body preview: ${content.body.substring(0, 50)}...`);
        console.log(`Tags: ${content.tags.join(", ")}`);
      } else {
        console.error("Content is not an article");
      }
      break;
    case "create_image":
    case "update_image":
    case "delete_image":
      if ("url" in content && "altText" in content) {
        console.log(`Image: ${content.title}`);
        console.log(`URL: ${content.url}`);
        console.log(`Alt Text: ${content.altText}`);
      } else {
        console.error("Content is not an image");
      }
      break;
    case "create_video":
    case "update_video":
    case "delete_video":
      if ("url" in content && "duration" in content) {
        console.log(`Video: ${content.title}`);
        console.log(`URL: ${content.url}`);
        console.log(`Duration: ${content.duration} seconds`);
      } else {
        console.error("Content is not a video");
      }
      break;
    default:
      console.error("Unknown action");
  }
}

// Sample content
const sampleArticle: Article = {
  id: "1",
  title: "Understanding TypeScript's Advanced Features",
  created: new Date("2023-08-01"),
  body: "TypeScript offers many advanced features that can greatly enhance your development experience. From conditional types to mapped types, these features provide powerful tools for creating flexible and type-safe code...",
  tags: ["typescript", "programming", "web development"],
};

const sampleImage: Image = {
  id: "2",
  title: "TypeScript Logo",
  created: new Date("2023-08-02"),
  url: "https://example.com/typescript-logo.png",
  altText: "Official TypeScript logo in blue",
};

const sampleVideo: Video = {
  id: "3",
  title: "Introduction to TypeScript",
  created: new Date("2023-08-03"),
  url: "https://example.com/intro-to-typescript.mp4",
  duration: 600, // 10 minutes
};

// Usage examples
console.log("Creating an article:");
performAction("create_article", sampleArticle);

console.log("\nUpdating an image:");
performAction("update_image", sampleImage);

console.log("\nDeleting a video:");
performAction("delete_video", sampleVideo);

// This will cause a TypeScript error:
//performAction('update_article', sampleImage);

// Example of using the freezeContent function
const frozenArticle = freezeContent(sampleArticle);
console.log("\nFrozen article:");
console.log(frozenArticle);
// Attempting to modify the frozen article would cause a TypeScript error:
// frozenArticle.title = 'New Title'; // Error

// Using the ExtractFields type
type ArticleFields = ExtractFields<Article, "id" | "created">;
const articleFields: ArticleFields = {
  title: "New Article",
  body: "This is the body of the new article.",
  tags: ["new", "article"],
};
console.log("\nExtracted article fields:");
console.log(articleFields);
