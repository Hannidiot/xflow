# Refactor Auth

This requirement aims to replace api part of current auth implementation in src/store/modules/user.ts, src/utils/auth.ts.

- For previous implementation, you can refer to
  - '/src/api/user.ts'
  - '/src/utils/auth.ts'
  - '/src/store/modules/user.ts'
- replace the login and logout method defined in '/src/store/modules/user.ts' with implementation in '/src/api/auth.ts'.
- currently, it will not call logout api when doing logout, remember to do so.
- there is no permission field in the response of '/src/api/auth.ts', its ok to leave it empty.
- modify the data model accordingly.
