# Using ts-node

When using ts-node and you're encountering an issue wherein ts-node freezes up, it can be because you're not supplying the correct file as argument.

```shell
ts-node hello.ts
```

You will also encounter an issue when you're trying to run a whole module in itself i.e. by running ts-node on the root of a project with `tsconfig.json`
