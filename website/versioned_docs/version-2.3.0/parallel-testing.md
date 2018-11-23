---
id: version-2.3.0-parallel-testing
title: Parallel testing
original_id: parallel-testing
---
There is a possibility to run tests in parallel.

## How to execute
Use a command `npm run kakunin -- --parallel <number of instances>` where `number of instances` is a number.

Example:
- `npm run kakunin -- --chrome --parallel 2`

<span style="color:red">Keep in mind that the merged report is available in the `reports/report/index.html` file. text</span>

## Specify pattern per each instance
- `npm run kakunin -- --parallel <number of instances> --pattern <regex to much feature> --pattern <regex to much feature>`

Keep in mind that:

- the number given in `parallel` must be equal to passed `patterns`
- `<number of instances>` is a number of instances of the specified browser
- `<regex>` is a pattern that is used to specify the list of specs that will be executed in each of the instances
-----------------------------------------------------------------------------------

## Troubleshooting
1. Running more than one instance in `Firefox` is not possible now (fix in-progress).
