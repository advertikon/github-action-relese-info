# github-action-release-info
GitHub action to fetch the latest asset's info

## Inputs

### `github-token`

**Required** GitHub token.

## Outputs

### `tag`

Asset's tag.

### `author`

Commit's author.

### `url`

Download link.

### `name`

Asset's name.

## Example usage

```yaml
uses: advertikon/github-action-relese-info@main
with:
  github-token: ${{ github.token }}
```
