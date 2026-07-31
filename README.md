# MySyst - Foundry VTT System / Module

## Purpose

This template is here to help you bootstrap quickly a foundry vtt **system or module** using `typescript`.

It works thanks to [foundry-vtt-types](https://github.com/League-of-Foundry-Developers/foundry-vtt-type)

## Install

## Usage

Go to `system.json`and edit the system `id`

Replace all ref to `MySyst` by your system name

## Building a module instead of a system

The build, the release archive and the Foundry registry publication all follow
the same `kind`, which is deduced from the manifest present in `src/`:

- `src/system.json` present, no `src/module.json` -> the package is a **system**
- `src/module.json` present -> the package is a **module**

So turning this template into a module takes two steps and no configuration:

1. Rename `src/system.json` to `src/module.json`.
2. Point `$schema` at `https://json.schemastore.org/foundryvtt-module-manifest.json`.

Everything else follows: the build writes `dist/module.json`, the release
uploads `module.json` + `module.zip`, `FOUNDRY_PATH` deployment targets
`Data/modules/<id>`, and the registry release is announced with the module
manifest URL.

Set the `KIND_OF_PROJECT` environment variable (`system` or `module`) only when
you need to override that detection.

## CI

You must create a secret in github action `GH_TOKEN` with a personal access token so `semantic-release` will be able to clone your code and make release

- contents: write to be able to publish a GitHub release
- issues: write to be able to comment on released issues
- pull-requests: write to be able to comment on released pull requests

You must create a secret in github action `FVTT_PUBLISH_TOKEN`with the `package Release Token`from foundry.

(cf [@semantic-release/github](https://github.com/semantic-release/github))

### Manual Deploy your system

[Latest Release](https://github.com/<group-user>/<repo>/releases/latest/download/system.json)
