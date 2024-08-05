# TypeScript Training - Aug. 5, 2024

## Using ts-node

When using ts-node and you're encountering an issue wherein ts-node freezes up, it can be because you're not supplying the correct file as argument.

```shell
ts-node hello.ts
```

You will also encounter an issue when you're trying to run a whole module in itself i.e. by running ts-node on the root of a project with `tsconfig.json`

## Type Predicates

- Sometimes, you want more direct control over how types change throughout your code.
- To define a user-defined type guard, define a function whose return type is a type predicate.

```typescript
interface BaseContent {
  id: string;
  title: string;
  created: Date;
}

interface Article extends BaseContent {
  body: string;
  tags: string[];
}

type Content = Article;

// Type guard to check if content is of a specific type
function isArticle(content: Content): content is Article {
  return (content as Article).body !== undefined;
}

if (isArticle(content)) {
  console.log(`Article: ${content.title}`);
  console.log(`Body preview: ${content.body.substring(0, 50)}...`);
  console.log(`Tags: ${content.tags.join(", ")}`);
} else {
  console.error("Content is not an article");
}
```

Any time `isArticle` is called with some variable, TypeScript will narrow that variable to that specific type i.e. `Article` if the original type is compatible.

If you try removing the return type of `content is Article` from the `isArticle` function, you will encounter the error wherein `body` and `tags` cannot be understood/recognized by TypeScript, since `content` is not being "narrowed".
