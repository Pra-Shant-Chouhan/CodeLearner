export const getJudge0LanguageId = (language) => {
    const languageMap = {
        "PYTHON": 71,
        "JAVA": 62,
        "JAVASCRIPT": 63,
    }
    return languageMap[language.toUpperCase()] || null;
}

export const submitBatch = async (submissions) => {
    const { data } = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`, {
        submissions
    })
    console.log("Submission Results: ", data)
    return data // [{token} , {token} , {token}]
}
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
export const pollBatchResults = async (submissions) => {
    while (true) {
        const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`, {
            params: {
                tokens: tokens.join(","),
                base64_encoded: false,
            }
        });
        const results = data.submissions;

        const isAllDone = results.every((rs) => rs.status.id !== 1 && rs.status.id !== 2)
        if (isAllDone) return results
        await sleep(1000)
    }
}
