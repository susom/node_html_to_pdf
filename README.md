# HTML to PDF

Short cloud function written in NodeJS to facilitate the automated conversion of HTML to PDF

### Functionality 

Post parameters take either raw HTML or a url string

Post request body example:

```
    {
       html: "<p>Hello there</p>"
    }
    
    or
    
    {
        url: "https://www.google.com"
    }
```

### Response 
A buffer of type byte array is returned in the following format:  

```
{
    "pdf": {
        "type": "Buffer",
        "data": [
            37,
            80,
            68,
            ...
        ]
    }
```

### Invoking the Cloud function

You must authenticate your Google Cloud hosted application by generating an ID token.

### Python example:

```python
 def get_authorization_token(self, audience):
        """
        Generates an ID token obtained from the google-auth client library
        using the specified audience value.
        """
        if settings.DEBUG: # If local, reference the credential file in root
            os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/som-irt-scci-dev-caea1579a524.json"

        auth_req = google.auth.transport.requests.Request()
        id_token = google.oauth2.id_token.fetch_id_token(auth_req, audience)

        return id_token
```

This token can then be passed via Authorization header in your post request.
```python 
headers = {'Authorization': f'bearer {token}'}
```

Authentication from an application outside of google cloud can be achieved by following this guide: https://cloud.google.com/run/docs/authenticating/service-to-service#calling-from-outside-gcp