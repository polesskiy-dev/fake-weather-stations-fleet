# Fake weather stations fleet

Part of Open IoT Agro project.

Console utility that aims to send fake weather data to AWS IoT cloud.

```
node fake-weather-stations-fleet.js --broker <broker address>
```

Weather station data example:

```json
{
  "tmp": 24,
  "hmd": 50,
  "wind": 12,
  "wdir": 1,
  "rain": 0
}
```

Sensors node data example:

```json
{
  "tmp1": 22,
  "hmd1": 50,
  "tmp2": 20,
  "hmd2": 40,
  "tmp3": 18,
  "hmd3": 30
}
```

## Certificates
Amazon requires to have signed certificates and TLS1.2 to connect things
Certificates are placed to `./certs` folder

To generate them follow articles:
[https://gist.github.com/exAspArk/f738f0771e2675e7f4c3b5d11403efd8](https://gist.github.com/exAspArk/f738f0771e2675e7f4c3b5d11403efd8)
[https://docs.aws.amazon.com/iot/latest/developerguide/create-CA-verification-cert.html?icmpid=docs_iot_console_secure_ca_reg](https://docs.aws.amazon.com/iot/latest/developerguide/create-CA-verification-cert.html?icmpid=docs_iot_console_secure_ca_reg)

To get *root-CA.crt* I run curl https://www.amazontrust.com/repository/AmazonRootCA1.pem > root-CA.crt

It's important to Allow * for certificate policy. Policy example:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "*",
      "Resource": "*"
    }
  ]
}
```
![](/assets/Screenshot 2022-02-24 at 00.28.55.png)

