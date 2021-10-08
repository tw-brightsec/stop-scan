# Stop a Nexploit Scan

This action stops a Nexploit scan.

### Build Secure Apps & APIs. Fast.

[NeuraLegion](https://www.neuralegion.com) is a powerful dynamic application & API security testing (DAST) platform that security teams trust and developers love.

### Automatically Tests Every Aspect of Your Apps & APIs

Scans any target, whether Web Apps, APIs (REST. & SOAP, GraphQL & more), Web sockets or mobile, providing actionable reports

### Seamlessly integrates with the Tools and Workflows You Already Use

NeuraLegion works with your existing CI/CD pipelines – trigger scans on every commit, pull request or build with unit testing.

### Spin-Up, Configure and Control Scans with Code

One file. One command. One scan. No UI needed.

### Super-Fast Scans

Interacts with applications and APIs, instead of just crawling them and guessing.
Scans are fast as our AI-powered engine can understand application architecture and generate sophisticated and targeted attacks.

### No False Positives

Stop chasing ghosts and wasting time. NeuraLegion doesn’t return false positives, so you can focus on releasing code.

### Comprehensive Security Testing

NeuraLegion tests for all common vulnerabilities, such as SQL injection, CSRF, XSS, and XXE -- as well as uncommon vulnerabilities, such as business logic vulnerabilities.

More information is available on NeuraLegion’s:
* [Website](https://www.neuralegion.com/)
* [Knowledge base](https://docs.neuralegion.com/docs/quickstart)
* [YouTube channel](https://www.youtube.com/channel/UCoIC0T1pmozq3eKLsUR2uUw)
* [GitHub Actions](https://github.com/marketplace?query=neuralegion+)

# Inputs

### `api_token`

**Required**. Your Nexploit API authorization token (key). You can generate it in the **Organization** section on [nexploit.app](https://nexploit.app/login). Find more information [here](https://kb.neuralegion.com/#/guide/np-web-ui/advanced-set-up/managing-org?id=managing-organization-apicli-authentication-tokens).

_Example:_ `api_token: ${{ secrets.NEXPLOIT_TOKEN }}`

### `scan`

**Required**. Scan ID to stop.

_Example:_ `scan: ${{ steps.start.outputs.id }}`

## Usage Example

### Stop a previously started scan

```yml
start_and_stop_scan:
  runs-on: ubuntu-latest
  name: A job to run a Nexploit scan
  steps:
  - name: 🏁 Start Nexploit Scan
    id: start
    uses: NeuraLegion/run-scan@master
    with:
      api_token: ${{ secrets.NEXPLOIT_TOKEN }}
      name: GitHub scan ${{ github.sha }}
      discovery_types: |
        [ "crawler", "archive" ]
      crawler_urls: |
        [ "https://juice-shop.herokuapp.com" ]
      file_id: LiYknMYSdbSZbqgMaC9Sj
      hosts_filter: |
        [ ]
      wait_for: on_high
  - name: Get the output scan url
    run: echo "The scan was started on ${{ steps.start.outputs.url }}"
  - name: ⏳ Wait for any issues
    id: wait
    uses: NeuraLegion/wait-for@master
    with:
      api_token: ${{ secrets.NEXPLOIT_TOKEN }}
      scan: ${{ steps.start.outputs.id }}
      wait_for: any
      timeout: 100
  - name: 🛑 Stop the scan
    if: ${{ always() }}
    id: stop
    uses: NeuraLegion/stop-scan@master
    with:
      api_token: ${{ secrets.NEXPLOIT_TOKEN }}
      scan: ${{ steps.start.outputs.id }}
```
