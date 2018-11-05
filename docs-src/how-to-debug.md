## How to debug

1. Install globally `ndb`: `npm install -g ndb`
2. Run Kakunin with `ndb` before command: `ndb npm run kakunin`

A new instance of Chromium will be started within a window where you can add breakpoints.
`ndb` is synced with the project - you can make changes there.

Keep in mind that `ndb` requires Node >=8.0.0. It works best with Node >=10.

More information can be found under the [link](https://www.npmjs.com/package/ndb)
