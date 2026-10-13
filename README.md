# Prosperous Logic website

Static website adapted from the supplied Prosperous Logic design package. The public site files live in `website/`; no framework, dependency installation, or build step is required.

## Local preview

Run `python3 -m http.server 4174 --directory website`, then visit http://localhost:4174.

## Hosting

- AWS account: Prosperous Logic (`602983921807`)
- Region: `us-east-1`
- Amplify app: `prosperous-logic` (`d3apu5pgamh3hf`)
- Branch: `main`
- AWS URL: https://main.d3apu5pgamh3hf.amplifyapp.com
- Primary domain: https://prosperouslogic.us
- Aliases: `www.prosperouslogic.us`, `plogic.us`, `www.plogic.us`
- DNS provider: Porkbun

The app uses manual artifact deployment. A Git push alone does **not** publish the site. `amplify.yml` is supplied for a future Git-connected deployment, with artifacts limited to the public `website/` files.

To redeploy, zip the four files inside `website/` at the archive root: `index.html`, `favicon.svg`, `robots.txt`, and `sitemap.xml`. Use Amplify's manual deployment for the existing `main` branch. Never include local login references, biographies, government documents, or the entire repository in the deployment archive.

## Content and contact

- William Austin is the primary owner; Brook Zink is co-owner, as directed by the owner.
- The supplied biographies support the short leadership summaries.
- Legal name, UEI `Q8B1KBJ3QNZ3`, CAGE `25XC9`, and active SAM registration come from the user's October 13, 2026 registration screenshots. These were not independently reverified against SAM.
- NAICS areas and capability copy come from the supplied design; they are not presented as a verified list of registered primary NAICS codes.
- The contact form prepares an email to `zachary.zink@plogic.us` in the visitor's email application. It does not send email or store submissions. Visitors must send the message themselves.

## Domain setup

The Amplify domain associations have been created. Porkbun must contain the certificate verification CNAME and website routing records supplied by Amplify before custom-domain HTTPS can work. Use an ALIAS for each root domain and CNAME for each `www` name. Preserve all email records. Check Amplify domain status and public HTTPS responses after changing DNS.

References: [Amplify domain redirects](https://docs.aws.amazon.com/amplify/latest/userguide/redirect-rewrite-examples.html) and [Porkbun root-domain ALIAS records](https://kb.porkbun.com/article/85-how-to-connect-your-root-domain-when-your-web-host-wont-provide-an-ip-address).
