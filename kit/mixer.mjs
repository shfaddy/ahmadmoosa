export const header = `

opcode shmix, 0, a

aNote xin

SInstrument sprintf "instrument/%d", int ( p ( 1 ) )

chnmix aNote * p ( 6 ) % 128 / 128, SInstrument

endop

`;

export const body = `

SInstrument sprintf "instrument/%d", p5

aNote chnget SInstrument

aNote clip aNote, 1, 0dbfs

SChannel sprintf "channel/%d", p4

chnset aNote * p6 % 128 / 128, SChannel

chnclear SInstrument

`;
