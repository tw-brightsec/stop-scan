# Stop Nexploit Scan

This action stops a Nexploit scan

## Inputs

### `api_token`

**Required** Api Token. You can generate it in *Organization* section

### `scan`

Scan ID to stop.

## Example usage

Stop a previously started scan

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
