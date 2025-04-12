export const body = `

iFraction random .1, .9
p1 init int ( p1 ) + iFraction

iRhythm random 0 + p5 / 12, p5 / 12 + 4

p3 /= 2^( ( iRhythm ) )

iAttack random 3, 8
iDecay random 0, int ( iAttack )
iSustain random iRhythm + 6, iRhythm + 10
iRelease random 4, 8

aAmplitude madsr p3/2^iAttack, p3/2^iDecay, 1/2^iSustain, p3/2^iRelease

iDetune random 0, 47

iNote init p5 + int ( iDetune ) / 4

iFrequency init cpsmidinn ( iNote )

iHigh random 1, 13

iSweep random 11, 15

aFrequency linseg iFrequency * 2^iHigh, 1 / 2^iSweep, iFrequency

aNote poscil aAmplitude, aFrequency

aSnatch noise 1, -0

aSnatch *= aAmplitude

aNote += aSnatch

kBand random 0, 2

aNote butterlp aNote, aFrequency * 2^int ( kBand )

shmix aNote

`;
