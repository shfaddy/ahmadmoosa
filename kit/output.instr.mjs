export const controller = {

channel: 1,
gain: 1

};

export const body = `

SChannel sprintf "channel/%d", iPChannel

aNote chnget SChannel

aNote clip aNote, 1, 0dbfs

outch iPChannel, aNote * iPGain

chnclear SChannel

`;
