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

instr 2, claps

iPChannel init p ( 4 )
iPAmplitude init p ( 5 )
iPSwing init p ( 6 )

aNote = 0

iSwing random 0, 127

if iSwing > iPSwing then

iClaps random 1, 4

SClaps sprintf "claps/%d.wav", int ( iClaps )

aLeft, aRight diskin2 SClaps


aNote = aLeft + aRight

p3 filelen SClaps

endif

aNote clip aNote, 1, 0dbfs

gaNote [ p4 ] = gaNote [ p4 ] + aNote * iPAmplitude

endin

instr 3, bow

iPChannel init p ( 4 )
iPAmplitude init p ( 5 )
iPKey init p ( 6 )

aNote = 0

iEnvelope init 1 / 2^2

if p3 < iEnvelope then

iEnvelope init p3

endif

iAttack init iEnvelope / 2^1
iDecay init iEnvelope / 2^3
iRelease init p3 - iAttack - iDecay

iSustain init 1

kAmplitude adsr iAttack, iDecay, iSustain, iRelease

iAmplitude init .99
iAmplitudeError init .01

kAmplitudeError rspline iAmplitude - iAmplitudeError, iAmplitude + iAmplitudeError, 0, p3

iAttack init iAttack / 2^13
iDecay init p3 - iAttack - iEnvelope / 2^9
iRelease init p3 - iAttack - iDecay

iShift init 240
iFrequency init cpsmidinn ( iPKey )

kFrequency linseg cpsmidinn ( iPKey + iShift ), iAttack, cpsmidinn ( iPKey ), iDecay, cpsmidinn ( iPKey ), iRelease, cpsmidinn ( iPKey + .1 )

kDetune rspline -.25, .25, 0, p3

kFrequency *= cent ( kDetune )

iPressure init 5
iPressureError init .01
; 1 - 5
kPressure rspline iPressure - iPressureError, iPressure + iPressureError, 0, p3

iPosition init .18
iPositionError init .001
; .025 - .23
kPosition rspline iPosition - iPositionError, iPosition + iPositionError, 0, p3

iVibratoFrequency init 1 / 2^8
iVibratoFrequencyError init 1 / 2^10
; 0 - 12
kVibratoFrequency rspline iVibratoFrequency - iVibratoFrequencyError, iVibratoFrequency + iVibratoFrequencyError, 0, p3

iVibratoAmplitude init .025
iVibratoAmplitudeError init .01
kVibratoAmplitude rspline iVibratoAmplitude - iVibratoAmplitudeError, iVibratoAmplitude + iVibratoAmplitudeError, 0, p3

aBody wgbow kAmplitude, iFrequency, kPressure, kPosition, kVibratoFrequency, kVibratoAmplitude

aNote += aBody

aZz vco2 kAmplitude, kFrequency, 6

aZz butterlp aZz, kFrequency * 2^0

kFilter linseg 2^13, iAttack, 2^0

aZz butterhp aZz, kFrequency * kFilter / 2^1

aNote += aZz

aNote clip aNote, 1, 0dbfs

gaNote [ p4 ] = gaNote [ p4 ] + aNote * iPAmplitude

endin

</CsInstruments>

<CsScore>

t 0 112.5

v 4

{ 3600 measure

i 3.1 [$measure + 0/16 + 0] [1/8] [0] [1/8] [48]

i 3.2 [$measure + 2/16 + 0] [1/8] [0] [1/8] [53]

i 2.1 [$measure + 4/16 + 0] [1/16] [0] [1/8] [0]

i 3.2 [$measure + 6/16 + 0] [1/8] [0] [1/8] [53]

i 3.1 [$measure + 8/16 + 0] [1/32] [0] [1/8] [48]

i 2.1 [$measure + 10/16 + 0] [1/16] [0] [1/8] [0]

i 3.2 [$measure + 12/16 + 0] [1/8] [0] [1/8] [53]

i 2.1 [$measure + 14/16 + 0] [1/16] [0] [1/8] [0]

}

</CsScore>

</CsoundSynthesizer>