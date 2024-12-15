const fs = require('fs');

function BuildGraph(data) {
    const graph = {};

    data.forEach((leftSigment, index) => {
        data.forEach((rightSigment) => {
            if (leftSigment !== rightSigment && leftSigment.slice(-2) === rightSigment.slice(0, 2)) {
                if (!graph[leftSigment]) graph[leftSigment] = [];
                graph[leftSigment].push(rightSigment);
            }
        });
    });

    for (const node in graph) {
        graph[node].sort();
    }
    return graph;
}

function GetLongestPath(graph, element, path) {
    let longPath = [...path, element];

    if (graph[element]) {
        graph[element].forEach(next => {
            if (!path.includes(next)) {
                const nextPath = GetLongestPath(graph, next, [...path, element]);
                if (nextPath.length > longPath.length) {
                    longPath = nextPath;
                }
            }
        });
    }

    return longPath;
}

function GetDataFromFile(filepath) {
    try {
        const data = fs.readFileSync(filepath, 'utf-8').split('\n').map(line => line.trim());
        
        const isValidData = data.every(line => /^[0-9]{6}$/.test(line));
        
        if (!isValidData) {
            throw new Error('Invalid data format in the file. Each line must contain exactly 6 digits with no spaces.');
        }
        
        return data;
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

function FindLongestFragmentChain(filepath) {
    try {
        const data = GetDataFromFile(filepath);
        data.sort();
        const graph = BuildGraph(data);
        let longestFragment = [];

        const progressBarLength = 40;
        const progressBarI = Math.floor(data.length / progressBarLength);
        
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            const path = GetLongestPath(graph, element, []);
            if (path.length > longestFragment.length) {
                longestFragment = path;
            }

            if (i % progressBarI === 0 || i === data.length - 1) {
                ShowProgress(i, data.length);
            }
        }

        return longestFragment.reduce((result, num, index) => {
            return index === 0 ? num : result + num.slice(2);
        }, '');
    } catch (error) {
        throw new Error(`${error.message}`);
    }
}

function ShowProgress(current, total) {
    const progressBarLength = 50;
    const progress = Math.floor((current / total) * progressBarLength);
    const progressBar = '#'.repeat(progress) + '-'.repeat(progressBarLength - progress);
    const percentage = Math.floor((current / total) * 100);

    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(`Processing [${progressBar}] ${percentage}%`);
}

const PromptFilePath = () => {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.question('Enter file path (.txt): ', (filePath) => {
            rl.close();

            if (!filePath.endsWith('.txt')) {
                return reject(new Error('Invalid file type. Please provide a .txt file.'));
            }

            resolve(filePath);
        });
    });
};

(async () => {
    try {
        const filePath = await PromptFilePath(); 
        const result = FindLongestFragmentChain(filePath);
        console.clear();
        console.log(`Result: ${result}, Length: ${result.length}`);
    } catch (error) {
        console.error(`${error.message}`);
    }
})();