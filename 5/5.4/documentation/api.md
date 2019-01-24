FORMAT: 1A
HOST: http://localhost:3000

# FeedbackW API

## Generating documentation

The documentation is rendered using [aglio](https://github.com/danielgtaylor/aglio).

The command for rendering is:

```bash
aglio -i documentation/api.md -o api-documentation.html
```

The following command can be used to have a preview of documentation when writing it:

```bash
aglio -i documentation/api.md -s -p 3001
```

<!-- include(group-events.md) -->
