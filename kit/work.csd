<CsoundSynthesizer>

<CsOptions>

-o dac
--logfile=dac.csl

</CsOptions>

<CsInstruments>

sr = 48000
ksmps = 32
nchnls = 1
0dbfs = 1

gaNote [] init nchnls

alwayson 1.1, 0

instr 1

aNote clip gaNote [ p4 ], 1, 0dbfs

outch p4 + 1, aNote

gaNote [ p4 ] = 0

endin

giStrikeFT ftgen 0, 0, 256, 1, "prerequisites/marmstk1.wav", 0, 0, 0
giVibratoFT ftgen 0, 0, 128, 10, 1

instr 2, tubluh

iPChannel init p ( 4 )
iPAmplitude init p ( 5 )
iPAttack init p ( 6 )
iPDecay init p ( 7 )
iPSustain init p ( 8 )
iPRelease init p ( 9 )
iPLow init p ( 10 )
iPLowSub init p ( 11 )
iPHigh init p ( 12 )
iPHighSub init p ( 13 )
iPGogobell init p ( 14 )
iPSnatch init p ( 15 )

iPitch random 0, 1

p3 init iPAttack + iPDecay + iPRelease

aNote = 0

aLowSubAmplitude linseg 0, iPAttack, 1, iPDecay, .25, iPRelease, 0
aLowSubFrequency linseg cpsoct ( iPHigh + iPitch ), iPAttack, cpsoct ( iPLow + iPitch )

aLowSub poscil aLowSubAmplitude, aLowSubFrequency

aNote += aLowSub * iPLowSub

aHighSubAmplitude linseg 0, iPAttack/8, 1, iPDecay/8, iPSustain, iPRelease/8, 0
aHighSubFrequency linseg cpsoct ( iPHigh + 2 + iPitch ), iPAttack/2, cpsoct ( iPLow + 2 + iPitch )

aHighSub poscil aHighSubAmplitude, aHighSubFrequency

aNote += aHighSub * iPHighSub

aGogobell gogobel 1, cpsoct ( iPLow + iPitch ), .5, .5, giStrikeFT, 6.0, 0.3, giVibratoFT

aNote += aGogobell * iPGogobell

aSnatchAmplitude linseg 0, iPAttack/8, 1, iPDecay/8, 0
aSnatchFrequency linseg cpsoct ( iPHigh + 2 + iPitch ), iPAttack/2, cpsoct ( iPHigh + iPitch )

aSnatch noise aSnatchAmplitude, 0
aSnatch butterlp aSnatch, aSnatchFrequency

aNote += aSnatch * iPSnatch

aNote clip aNote, 1, 0dbfs

gaNote [ p4 ] = gaNote [ p4 ] + aNote * iPAmplitude

endin

</CsInstruments>

<CsScore>

t 0 112.5

v 4

{ 60 measure

i 2.1 [$measure + 0/8 + (0 * 0)] [(1/16 * 1)] [0] [1] [1/32] [1/8] [1/4] [1/2] [5] [1] [8] [1/8] [1/4] [1/4]

i 2.2 [$measure + 1/8 + (0 * 0)] [(1/64 * 1)] [0] [1] [1/2^8] [1/2^6] [1/2^4] [1/^4] [7] [1] [12] [1/8] [1/4] [1/4]
i 2.3 [$measure + 1/8 + (1/2^9 * 0)] [(1/64 * 1)] [0] [1] [1/2^8] [1/2^6] [1/2^4] [1/^4] [7] [1] [12] [1/8] [1/4] [1/4]
i 2.4 [$measure + 1/8 + (1/2^10 * 0)] [(1/4 * 1)] [0] [0] [1/32] [1/8] [1/4] [1/2] [5] [1] [8] [1/8] [1/4] [1/4]

i 2.2 [$measure + 3/8 + (0 * 0)] [(1/64 * 1)] [0] [1] [1/2^8] [1/2^6] [1/2^4] [1/^4] [7] [1] [12] [1/8] [1/4] [1/4]
i 2.3 [$measure + 3/8 + (1/2^9 * 0)] [(1/64 * 1)] [0] [1] [1/2^8] [1/2^6] [1/2^4] [1/^4] [7] [1] [12] [1/8] [1/4] [1/4]
i 2.4 [$measure + 3/8 + (1/2^10 * 0)] [(1/4 * 1)] [0] [0] [1/32] [1/8] [1/4] [1/2] [5] [1] [8] [1/8] [1/4] [1/4]

i 2.1 [$measure + 4/8 + (0 * 0)] [(1/16 * 1)] [0] [1] [1/32] [1/8] [1/4] [1/2] [5] [1] [8] [1/8] [1/4] [1/4]

i 2.2 [$measure + 6/8 + (0 * 0)] [(1/64 * 1)] [0] [1] [1/2^8] [1/2^6] [1/2^4] [1/^4] [7] [1] [12] [1/8] [1/4] [1/4]
i 2.3 [$measure + 6/8 + (1/2^9 * 0)] [(1/64 * 1)] [0] [1] [1/2^8] [1/2^6] [1/2^4] [1/^4] [7] [1] [12] [1/8] [1/4] [1/4]
i 2.4 [$measure + 6/8 + (1/2^10 * 0)] [(1/4 * 1)] [0] [0] [1/32] [1/8] [1/4] [1/2] [5] [1] [8] [1/8] [1/4] [1/4]

}

</CsScore>

</CsoundSynthesizer>