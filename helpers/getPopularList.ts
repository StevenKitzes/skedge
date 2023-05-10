export function getPopularList(dates: number[], userResponses: { [key: string]: boolean }[]): number[] {
  const voteCounts: number[] = new Array(dates.length).fill(0)

  dates.forEach((date, dateIndex) => {
    userResponses.forEach(user => {
      if (user[date]) voteCounts[dateIndex]++
    })
  })

  // make sure there are at least some votes
  let votedDates: number = 0
  voteCounts.forEach(voteCount => votedDates += voteCount > 0 ? 1 : 0)
  if (votedDates === 0) return []

  // find highest score
  let highest: number = 0
  voteCounts.forEach(voteCount => highest = voteCount > highest ? voteCount : highest)

  // put every index that has this score in the output
  const output: number[] = []
  voteCounts.forEach((voteCount, voteCountIndex) => {
    if (voteCount === highest) output.push(voteCountIndex)
  })

  // report no winner if a majority are tied for first
  if (output.length > Math.ceil(dates.length/2)) return []

  return output
}
