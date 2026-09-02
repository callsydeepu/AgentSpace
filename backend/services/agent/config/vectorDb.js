export const vectorStore = async (docs, collectionName) => {
    return {
        similaritySearch: async (query, k = 5) => {
            const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2)
            const scoredDocs = docs.map(doc => {
                const text = doc.pageContent.toLowerCase()
                let score = 0
                queryWords.forEach(word => {
                    if (text.includes(word)) score += 1
                })
                return { doc, score }
            })
            scoredDocs.sort((a, b) => b.score - a.score)
            return scoredDocs.slice(0, k).map(item => item.doc)
        }
    }
}
