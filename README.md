# Karun's Resume

![Build & Deploy](https://github.com/javatarz/karun.me/workflows/Build%20&%20Deploy/badge.svg)

[Karun's personal website](https://karun.me)

## Local Development
`npm i && npm run dev`

### Deployment from local
If github actions is down, run the following command to deploy the latest code
```
aws-vault exec personal -- aws s3 rm --recursive s3://karun.me/ && aws-vault exec personal -- aws s3 cp --recursive --acl=public-read out/ s3://karun.me/
```
