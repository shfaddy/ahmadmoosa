#!/usr/bin/env bash

node index.mjs \
tempo 112.5 \
measure 4 \
dom+sagat 0 + 2 \
/ tak+sagat 1 + 3 + 6 \
/ sak+claps \
/ sik \
> index.sco

csound index.csd
