# Skill Test - Backend Developer

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# API Documentation

## Mail Event

This endpoint convert [this JSON](https://github.com/aws/aws-lambda-go/blob/main/events/testdata/ses-sns-event.json) to [this structure](https://pastebin.com/bNgAT6Rp).

```http
POST /mail/event
```

### Response

```javascript
{
    "spam": boolean,
    "virus": boolean.
    "dns": boolean,
    "mes": string
    "retrasado": boolean
    "emisor": boolean
    "receptor": string[]
}
```

## Mail Parser

This endpoint receive a [mail with attachment](https://support.google.com/mail/answer/9261412?hl=en) as a file using form data.

```http
POST /mail/parse
```

| Parameter | Type   | Description                            |
| :-------- | :----- | :------------------------------------- |
| `mail`    | `File` | **Required**. An email with attachment |

### Response

The response is the JSON file attached to the email in any of the following cases:

- As a file attachment
- Inside the body of the email as a link
- Inside the body of the email as a link that leads to a webpage where there is a link that leads to the actual JSON.

## Status Codes

The API return the following status codes.

| Status Code | Description             |
| :---------- | :---------------------- |
| 200         | `OK`                    |
| 400         | `BAD REQUEST`           |
| 404         | `NOT FOUND`             |
| 500         | `INTERNAL SERVER ERROR` |

## Try it out

To try out the API in postman use the file
`postman-collection.json` at the root of the project.
