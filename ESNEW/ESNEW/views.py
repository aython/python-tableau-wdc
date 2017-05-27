"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from ESNEW import app
from elasticsearch import Elasticsearch
import json
import sys  
import os
import subprocess

es = Elasticsearch(hosts=[{'host': "localhost", 'port': "9200"}])

res = es.search(index="ossec_log1",size=200000, body={"query": {"match_all": {}}})

mydata = []
for hit in res['hits']['hits']:
    v = hit["_source"]
    mydata.append({'srcip1':v.get('src_ip', '0'),'srcip2':v.get('src_ip', '0')[0],'alertid':float(v.get('alertid', '0')),'timestamp': v.get('@timestamp', '0'),'event_heading': v.get('event_heading', '0'),'reporting_host': v.get('reporting_host', '0'),'dst_ip': v.get('dst_ip', '0'),'reporting_source': v.get('reporting_source', '0'),'rule_id': v.get('rule_id', '0'),'level': v.get('level', '0'),'event_information': v.get('event_information', '0'),'ident': v.get('ident', '0'),'auth': v.get('auth', '0'),'verb': v.get('verb', '0'),'request': v.get('request', '0'),'httpversion': v.get('httpversion', '0'),'response': v.get('response', '0'),'link': v.get('link', '0'),'detailed_information': v.get('detailed_information', '0'),
'geoipip':v.get('geoip', {}).get('ip', '0.0.0.0'),'countrycode2': v.get('geoip', {}).get('country_code2', '0.0.0.0'),
'countrycode3': v.get('geoip', {}).get('country_code3', '0.0.0.0'),
'countryname': v.get('geoip', {}).get('country_name', '0.0.0.0'),
'continentcode': v.get('geoip', {}).get('continent_code', '0.0.0.0'),
'regionname': v.get('geoip', {}).get('region_name', '0.0.0.0'),
'cityname': v.get('geoip', {}).get('city_name', '0.0.0.0'),
'latitude': v.get('geoip', {}).get('latitude', '0.0.0.0'),
'longitude': v.get('geoip', {}).get('longitude', '0.0.0.0'),
'dma_code': v.get('geoip', {}).get('dma_code', '0.0.0.0'),
'areacode': v.get('geoip', {}).get('area_code', '0.0.0.0'),
'timezone': v.get('geoip', {}).get('timezone', '0.0.0.0'),
'realregionname': v.get('geoip', {}).get('real_region_name', '0.0.0.0')})
result = {"mydata":mydata}
q = json.dumps(result)


@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/contact')
def contact():
    """Renders the contact page."""
    return render_template(
        'contact.html',
        title='Contact',
        year=datetime.now().year,
        message='Your contact page.',
        q=q
    )
@app.route('/wdc')
def wdc():
    """Renders the contact page."""
    return render_template(
        'WDC.html',
        title='wdc ES',
        year=datetime.now().year,
        message='Your WDC page.',
        q=q
    )
@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )