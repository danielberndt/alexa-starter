# Alexa Starter

This is a starter prepared for a hackathon in September 2017.

## Requirements

- [yarn](https://yarnpkg.com/en/)
- [apex](http://apex.run/) (for automated deployment)

## Setup

- git clone
- `cd alexa-starter`
- `yarn install`

- Add your credentials to `~/.aws/credentials`
- Adapt the `project.json` according to your needs

## Deploy

- `apex -r [AWS_REGION] deploy`

## Monitor logs

 - `apex -r [AWS_REGION] logs`
