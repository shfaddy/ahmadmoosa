<CsoundSynthesizer>

<CsOptions>

-odac

--smacro:score=.sco

</CsOptions>

<CsInstruments>

#include "synthesizer/header.part"
#include "synthesizer/output.part"

</CsInstruments>

<CsScore>

#includestr "$score"

</CsScore>

</CsoundSynthesizer>
