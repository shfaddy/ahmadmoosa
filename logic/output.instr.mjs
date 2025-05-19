export const controller = {

channel: 0,
amplitude: 0

};

export const body = `

aNote clip gaNote [ iPChannel ], 1, 0dbfs

outch iPChannel, aNote * iPAmplitude

gaNote [ iPChannel ] = 0

`;
