---
title: De black box in je broekzak
description:
  Een taalmodel dat vlot antwoordt, lijkt te begrijpen wat het zegt. Die
  indruk is precies het probleem.
tags: [ai]
---

Vraag een taalmodel om iets uit te leggen en je krijgt een vloeiend, geduldig en
zelfverzekerd antwoord. Vraag het naar iets wat niet bestaat en je krijgt
hetzelfde vloeiende, geduldige, zelfverzekerde antwoord. Het verschil zit niet
in de toon.

Dat is geen randgeval of kinderziekte. Het is hoe het ding werkt.

## Wat er onder de motorkap gebeurt

Een taalmodel schat, gegeven alles wat er tot nu toe staat, hoe waarschijnlijk
elk mogelijk volgend stukje tekst is. Daarna kiest het er een. En dan opnieuw.

```python
# Sterk vereenvoudigd, maar dit is de kern.
tokens = tokenize("De hoofdstad van Belgie is")
while not klaar(tokens):
    kansen = model(tokens)          # kans per mogelijk vervolg
    volgende = kies(kansen, temp=0.7)
    tokens.append(volgende)
```

Nergens in die lus zit een stap waarin het model nagaat of wat het zegt klopt.
Er is geen aparte feitencontrole die het antwoord tegenhoudt. Vloeiendheid en
correctheid komen uit dezelfde beweging, dus ze voelen voor de lezer identiek
aan.

> Het model is niet aan het liegen. Liegen veronderstelt dat je de waarheid kent
> en er van afwijkt.
>
> <cite>Iets wat ik te vaak moet herhalen</cite>

## Waarom dat lastiger is dan het klinkt

We hebben geen gewoonte om zelfverzekerde, welgevormde taal te wantrouwen. Bij
een mens is vlot en gedetailleerd praten over een onderwerp een redelijk signaal
van kennis. Niet perfect, maar het correleert. Bij een taalmodel is die
correlatie doorgeknipt, en onze intuïtie is niet meegegaan.

Concreet betekent dat drie dingen:

- **Het model weet niet wat het niet weet.** Er is geen interne meter die
  uitslaat bij een gat in de kennis.
- **Zekerheid in de formulering zegt niets.** "Ongetwijfeld" en "mogelijk" zijn
  stijlkeuzes, geen kansuitspraken.
- **Verifiëren kost meer moeite dan genereren.** Dat is de echte kost, en die
  verschuift naar jou.

## Wat ik ermee doe

Ik gebruik taalmodellen elke dag. Voor dingen waar ik de uitkomst zelf kan
beoordelen: code die ik kan draaien, een tekst waarvan ik het onderwerp ken, een
structuur die ik kan omgooien. Daar zijn ze uitstekend.

Voor dingen waar ik de uitkomst niet kan beoordelen, gebruik ik ze niet. Niet
omdat het verboden zou moeten zijn, maar omdat ik dan geen enkele manier heb om
te weten of ik iets goeds in handen heb.

Dat onderscheid, tussen "ik kan dit nakijken" en "ik kan dit niet nakijken", is
in mijn ervaring bruikbaarder dan elke lijst met regels.
