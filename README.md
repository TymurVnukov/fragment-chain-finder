# Longest Fragment Chain Finder

This tool helps to find the longest chain of fragments from a given list of 6-digit strings. The program reads a `.txt` file containing fragments, validates their format, and calculates the longest possible chain where each fragment's last two digits match the first two digits of the next fragment in the chain.

## How to Use:

### Prerequisites:
- Ensure **Node.js** is installed on your machine.
  - **To check Node.js installation:**  
    ```bash
    node -v
    ```
  - If not installed, download and install Node.js from [nodejs.org](https://nodejs.org/).

### Steps:
1. Clone or download the repository.
2. Open a terminal and navigate to the directory containing `script.js`.
3. Run the script using the following command:
    ```bash
    node script.js
    ```
4. Provide a `.txt` file containing 6-digit numerical strings when prompted.
5. The script will output the longest chain of connected fragments.

### Example Input:
```txt
608017
248460
962282
994725
177092
