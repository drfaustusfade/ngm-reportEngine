#!/bin/bash
##################################################
# ReportHub set WFP Livelihoods to actual
# Steps
#		- run API
##################################################
curl 'https://reporthub.org/api/wfp/livelihoods/setLivelihoodsDatasetActionAid'
curl 'https://reporthub.org/api/wfp/livelihoods/setLivelihoodsDatasetBrac'