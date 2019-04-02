# sovothinkresort
 Today, a democratic system is not fully functioning  therefore, a new democratic system is needed.name of the system democracy 4.0
 What does this new social media work for?
 
After becoming a member you can become a world leader with the algorithm.At the moment of testing.Do you want to test it for its faults?
Django Extensions requires Django 2.1.7 or later.
requirements:
```
pip install 
django-allauth 
django-ckeditor 
django-cleanup 
django-taggit 
django-vote 
django-crontab 
django-haystack 
django-channels
django-recaptcha2 
django-extensions 
redis 
psycopg2
pysolr
```
If you want to install it from source, grab the git repository from GitHub and run sovothinkresort:
```
$ git clone https://github.com/mrParabol/sovothinkresort.git
$ sudo mv sovothinkresort /var/www/
$ cd /var/www/sovothinkresort
$ sudo python3.6 manage.py crontab add
$ sudo python3.6 manage.py runserver
```
Warning: Solr 7 Settings:
```
$ cd /var
$ sudo chmod -R 777
$ sudo su - solr -c '/opt/solr/bin/solr create -c haystacksovothinkresortsearch'
$ cd /var/solr/data/haystacksovothinksearch/conf/
$ sudo gedit solrconfig.xml
```
comment on the following class:
```
ManagedIndexSchemaFactory
```
Add this below the class you commented on:
```
<schemaFactory class="ClassicIndexSchemaFactory"/>
```
and then comment on the following class:
```
updateProcessor and AddSchemaFieldsUpdateProcessorFactory 
```
and
```
<updateRequestProcessorChain name="add-unknown-fields-to-the-schema" default="${update.autoCreateFields:true}"
           processor="uuid,remove-blank,field-name-mutating,parse-boolean,parse-long,parse-double,parse-date,add-schema-fields">
    <processor class="solr.LogUpdateProcessorFactory"/>
    <processor class="solr.DistributedUpdateProcessorFactory"/>
    <processor class="solr.RunUpdateProcessorFactory"/>
  </updateRequestProcessorChain>
  ```
and
```
<updateProcessor class="solr.UUIDUpdateProcessorFactory" name="uuid"/>
  <updateProcessor class="solr.RemoveBlankFieldUpdateProcessorFactory" name="remove-blank"/>
  <updateProcessor class="solr.FieldNameMutatingUpdateProcessorFactory" name="field-name-mutating">
    <str name="pattern">[^\w-\.]</str>
    <str name="replacement">_</str>
  </updateProcessor>
  <updateProcessor class="solr.ParseBooleanFieldUpdateProcessorFactory" name="parse-boolean"/>
  <updateProcessor class="solr.ParseLongFieldUpdateProcessorFactory" name="parse-long"/>
  <updateProcessor class="solr.ParseDoubleFieldUpdateProcessorFactory" name="parse-double"/>
  <updateProcessor class="solr.ParseDateFieldUpdateProcessorFactory" name="parse-date">
    <arr name="format">
      <str>yyyy-MM-dd'T'HH:mm:ss.SSSZ</str>
      <str>yyyy-MM-dd'T'HH:mm:ss,SSSZ</str>
      <str>yyyy-MM-dd'T'HH:mm:ss.SSS</str>
      <str>yyyy-MM-dd'T'HH:mm:ss,SSS</str>
      <str>yyyy-MM-dd'T'HH:mm:ssZ</str>
      <str>yyyy-MM-dd'T'HH:mm:ss</str>
      <str>yyyy-MM-dd'T'HH:mmZ</str>
      <str>yyyy-MM-dd'T'HH:mm</str>
      <str>yyyy-MM-dd HH:mm:ss.SSSZ</str>
      <str>yyyy-MM-dd HH:mm:ss,SSSZ</str>
      <str>yyyy-MM-dd HH:mm:ss.SSS</str>
      <str>yyyy-MM-dd HH:mm:ss,SSS</str>
      <str>yyyy-MM-dd HH:mm:ssZ</str>
      <str>yyyy-MM-dd HH:mm:ss</str>
      <str>yyyy-MM-dd HH:mmZ</str>
      <str>yyyy-MM-dd HH:mm</str>
      <str>yyyy-MM-dd</str>
    </arr>
  </updateProcessor>
```
Change the name of the managed-schema file to schema.xml.
Create the currency.xml file in the same directory and write following codes.
```
<?xml version="1.0" ?>
<!--
 Licensed to the Apache Software Foundation (ASF) under one or more
 contributor license agreements.  See the NOTICE file distributed with
 this work for additional information regarding copyright ownership.
 The ASF licenses this file to You under the Apache License, Version 2.0
 (the "License"); you may not use this file except in compliance with
 the License.  You may obtain a copy of the License at
     http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<!-- Example exchange rates file for CurrencyField type named "currency" in example schema -->

<currencyConfig version="1.0">
  <rates>
    <!-- Updated from http://www.exchangerate.com/ at 2011-09-27 -->
    <rate from="USD" to="ARS" rate="4.333871" comment="ARGENTINA Peso" />
    <rate from="USD" to="AUD" rate="1.025768" comment="AUSTRALIA Dollar" />
    <rate from="USD" to="EUR" rate="0.743676" comment="European Euro" />
    <rate from="USD" to="BRL" rate="1.881093" comment="BRAZIL Real" />
    <rate from="USD" to="CAD" rate="1.030815" comment="CANADA Dollar" />
    <rate from="USD" to="CLP" rate="519.0996" comment="CHILE Peso" />
    <rate from="USD" to="CNY" rate="6.387310" comment="CHINA Yuan" />
    <rate from="USD" to="CZK" rate="18.47134" comment="CZECH REP. Koruna" />
    <rate from="USD" to="DKK" rate="5.515436" comment="DENMARK Krone" />
    <rate from="USD" to="HKD" rate="7.801922" comment="HONG KONG Dollar" />
    <rate from="USD" to="HUF" rate="215.6169" comment="HUNGARY Forint" />
    <rate from="USD" to="ISK" rate="118.1280" comment="ICELAND Krona" />
    <rate from="USD" to="INR" rate="49.49088" comment="INDIA Rupee" />
    <rate from="USD" to="XDR" rate="0.641358" comment="INTNL MON. FUND SDR" />
    <rate from="USD" to="ILS" rate="3.709739" comment="ISRAEL Sheqel" />
    <rate from="USD" to="JPY" rate="76.32419" comment="JAPAN Yen" />
    <rate from="USD" to="KRW" rate="1169.173" comment="KOREA (SOUTH) Won" />
    <rate from="USD" to="KWD" rate="0.275142" comment="KUWAIT Dinar" />
    <rate from="USD" to="MXN" rate="13.85895" comment="MEXICO Peso" />
    <rate from="USD" to="NZD" rate="1.285159" comment="NEW ZEALAND Dollar" />
    <rate from="USD" to="NOK" rate="5.859035" comment="NORWAY Krone" />
    <rate from="USD" to="PKR" rate="87.57007" comment="PAKISTAN Rupee" />
    <rate from="USD" to="PEN" rate="2.730683" comment="PERU Sol" />
    <rate from="USD" to="PHP" rate="43.62039" comment="PHILIPPINES Peso" />
    <rate from="USD" to="PLN" rate="3.310139" comment="POLAND Zloty" />
    <rate from="USD" to="RON" rate="3.100932" comment="ROMANIA Leu" />
    <rate from="USD" to="RUB" rate="32.14663" comment="RUSSIA Ruble" />
    <rate from="USD" to="SAR" rate="3.750465" comment="SAUDI ARABIA Riyal" />
    <rate from="USD" to="SGD" rate="1.299352" comment="SINGAPORE Dollar" />
    <rate from="USD" to="ZAR" rate="8.329761" comment="SOUTH AFRICA Rand" />
    <rate from="USD" to="SEK" rate="6.883442" comment="SWEDEN Krona" />
    <rate from="USD" to="CHF" rate="0.906035" comment="SWITZERLAND Franc" />
    <rate from="USD" to="TWD" rate="30.40283" comment="TAIWAN Dollar" />
    <rate from="USD" to="THB" rate="30.89487" comment="THAILAND Baht" />
    <rate from="USD" to="AED" rate="3.672955" comment="U.A.E. Dirham" />
    <rate from="USD" to="UAH" rate="7.988582" comment="UKRAINE Hryvnia" />
    <rate from="USD" to="GBP" rate="0.647910" comment="UNITED KINGDOM Pound" />
    
    <!-- Cross-rates for some common currencies -->
    <rate from="EUR" to="GBP" rate="0.869914" />  
    <rate from="EUR" to="NOK" rate="7.800095" />  
    <rate from="GBP" to="NOK" rate="8.966508" />  
  </rates>
</currencyConfig>
```
and then you have to write to terminale:
```
sudo mkdir /var/www/sovothinkresort/templates/search_configuration
sudo touch /var/www/sovothinkresort/templates/search_configuration/solr.xml
sudo gedit /var/www/sovothinkresort/templates/search_configuration/solr.xml
```
Put it in the file that we opened with gedit:
```
<?xml version="1.0" encoding="UTF-8" ?>
<!--
 Licensed to the Apache Software Foundation (ASF) under one or more
 contributor license agreements.  See the NOTICE file distributed with
 this work for additional information regarding copyright ownership.
 The ASF licenses this file to You under the Apache License, Version 2.0
 (the "License"); you may not use this file except in compliance with
 the License.  You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<!--
 This is the Solr schema file. This file should be named "schema.xml" and
 should be in the conf directory under the solr home
 (i.e. ./solr/conf/schema.xml by default)
 or located where the classloader for the Solr webapp can find it.

 This example schema is the recommended starting point for users.
 It should be kept correct and concise, usable out-of-the-box.

 For more information, on how to customize this file, please see
 http://wiki.apache.org/solr/SchemaXml

 PERFORMANCE NOTE: this schema includes many optional features and should not
 be used for benchmarking.  To improve performance one could
  - set stored="false" for all fields possible (esp large fields) when you
    only need to search on the field but don't need to return the original
    value.
  - set indexed="false" if you don't need to search on the field, but only
    return the field as a result of searching on other indexed fields.
  - remove all unneeded copyField statements
  - for best index size and searching performance, set "index" to false
    for all general text fields, use copyField to copy them to the
    catchall "text" field, and use that for searching.
  - For maximum indexing performance, use the ConcurrentUpdateSolrServer
    java client.
  - Remember to run the JVM in server mode, and use a higher logging level
    that avoids logging every request
-->

<schema name="example-data-driven-schema" version="1.6">

    <!--
    ######################## django-haystack specifics begin ########################
    -->

    <fieldType name="edge_ngram" class="solr.TextField" positionIncrementGap="1">
        <analyzer type="index">
            <tokenizer class="solr.WhitespaceTokenizerFactory" />
            <filter class="solr.LowerCaseFilterFactory" />
            <filter class="solr.WordDelimiterFilterFactory" generateWordParts="1" generateNumberParts="1" catenateWords="0" catenateNumbers="0" catenateAll="0" splitOnCaseChange="1"/>
            <filter class="solr.EdgeNGramFilterFactory" minGramSize="2" maxGramSize="15" />
        </analyzer>
        <analyzer type="query">
            <tokenizer class="solr.WhitespaceTokenizerFactory" />
            <filter class="solr.LowerCaseFilterFactory" />
            <filter class="solr.WordDelimiterFilterFactory" generateWordParts="1" generateNumberParts="1" catenateWords="0" catenateNumbers="0" catenateAll="0" splitOnCaseChange="1"/>
        </analyzer>
    </fieldType>

    <fieldType name="ngram" class="solr.TextField" >
        <analyzer type="index">
            <tokenizer class="solr.KeywordTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.NGramFilterFactory" minGramSize="3" maxGramSize="15" />
        </analyzer>
        <analyzer type="query">
            <tokenizer class="solr.KeywordTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
        </analyzer>
    </fieldType>
    <!--<field name="{{ ID }}" type="string" indexed="true" stored="true" multiValued="false" required="true"/>
    <field name="{{ DJANGO_ID }}" type="string" indexed="true" stored="true" multiValued="false"/>
     -->
    <field name="id" type="string" indexed="true" stored="true" multiValued="false" required="true"/>
    <field name="{{ DJANGO_CT }}" type="string" indexed="true" stored="true" multiValued="false"/>
    <field name="django_id" type="string" indexed="true" stored="true" multiValued="false"/>
    {% for field in fields %}
    <field name="{{ field.field_name }}" type="{{ field.type }}" indexed="{{ field.indexed }}" stored="{{ field.stored }}" multiValued="{{ field.multi_valued }}" />
    {% endfor %}

    <uniqueKey>{{ ID }}</uniqueKey>

    <!--
    ######################## django-haystack specifics end ########################
    -->

    <!-- attribute "name" is the name of this schema and is only used for display purposes.
       version="x.y" is Solr's version number for the schema syntax and
       semantics.  It should not normally be changed by applications.

       1.0: multiValued attribute did not exist, all fields are multiValued
            by nature
       1.1: multiValued attribute introduced, false by default
       1.2: omitTermFreqAndPositions attribute introduced, true by default
            except for text fields.
       1.3: removed optional field compress feature
       1.4: autoGeneratePhraseQueries attribute introduced to drive QueryParser
            behavior when a single string produces multiple tokens.  Defaults
            to off for version >= 1.4
       1.5: omitNorms defaults to true for primitive field types
            (int, float, boolean, string...)
       1.6: useDocValuesAsStored defaults to true.
    -->

    <!-- Valid attributes for fields:
     name: mandatory - the name for the field
     type: mandatory - the name of a field type from the
       fieldTypes section
     indexed: true if this field should be indexed (searchable or sortable)
     stored: true if this field should be retrievable
     docValues: true if this field should have doc values. Doc values are
       useful for faceting, grouping, sorting and function queries. Although not
       required, doc values will make the index faster to load, more
       NRT-friendly and more memory-efficient. They however come with some
       limitations: they are currently only supported by StrField, UUIDField
       and all Trie*Fields, and depending on the field type, they might
       require the field to be single-valued, be required or have a default
       value (check the documentation of the field type you're interested in
       for more information)
     multiValued: true if this field may contain multiple values per document
     omitNorms: (expert) set to true to omit the norms associated with
       this field (this disables length normalization and index-time
       boosting for the field, and saves some memory).  Only full-text
       fields or fields that need an index-time boost need norms.
       Norms are omitted for primitive (non-analyzed) types by default.
     termVectors: [false] set to true to store the term vector for a
       given field.
       When using MoreLikeThis, fields used for similarity should be
       stored for best performance.
     termPositions: Store position information with the term vector.
       This will increase storage costs.
     termOffsets: Store offset information with the term vector. This
       will increase storage costs.
     required: The field is required.  It will throw an error if the
       value does not exist
     default: a value that should be used if no value is specified
       when adding a document.
    -->

    <!-- field names should consist of alphanumeric or underscore characters only and
      not start with a digit.  This is not currently strictly enforced,
      but other field names will not have first class support from all components
      and back compatibility is not guaranteed.  Names with both leading and
      trailing underscores (e.g. _version_) are reserved.
    -->

    <!-- In this data_driven_schema_configs configset, only three fields are pre-declared:
         id, _version_, and _text_.  All other fields will be type guessed and added via the
         "add-unknown-fields-to-the-schema" update request processor chain declared
         in solrconfig.xml.

         Note that many dynamic fields are also defined - you can use them to specify a
         field's type via field naming conventions - see below.

         WARNING: The _text_ catch-all field will significantly increase your index size.
         If you don't need it, consider removing it and the corresponding copyField directive.
    -->

    <field name="_version_" type="long" indexed="true" stored="false"/>
    <field name="_root_" type="string" indexed="true" stored="false" docValues="false" />
    <field name="_text_" type="text_general" indexed="true" stored="false" multiValued="true"/>
    <copyField source="*" dest="_text_"/>


    <!-- Dynamic field definitions allow using convention over configuration
       for fields via the specification of patterns to match field names.
       EXAMPLE:  name="*_i" will match any field ending in _i (like myid_i, z_i)
       RESTRICTION: the glob-like pattern in the name attribute must have
       a "*" only at the start or the end.  -->

    <dynamicField name="*_i"  type="int"    indexed="true"  stored="true"/>
    <dynamicField name="*_is" type="ints"    indexed="true"  stored="true"/>
    <dynamicField name="*_s"  type="string"  indexed="true"  stored="true" />
    <dynamicField name="*_ss" type="strings"  indexed="true"  stored="true"/>
    <dynamicField name="*_l"  type="long"   indexed="true"  stored="true"/>
    <dynamicField name="*_ls" type="longs"   indexed="true"  stored="true"/>
    <dynamicField name="*_t"   type="text_general" indexed="true" stored="true"/>
    <dynamicField name="*_txt" type="text_general" indexed="true" stored="true"/>
    <dynamicField name="*_b"  type="boolean" indexed="true" stored="true"/>
    <dynamicField name="*_bs" type="booleans" indexed="true" stored="true"/>
    <dynamicField name="*_f"  type="float"  indexed="true"  stored="true"/>
    <dynamicField name="*_fs" type="floats"  indexed="true"  stored="true"/>
    <dynamicField name="*_d"  type="double" indexed="true"  stored="true"/>
    <dynamicField name="*_ds" type="doubles" indexed="true"  stored="true"/>

    <!-- Type used to index the lat and lon components for the "location" FieldType -->
    <dynamicField name="*_coordinate"  type="tdouble" indexed="true"  stored="false" useDocValuesAsStored="false" />

    <dynamicField name="*_dt"  type="date"    indexed="true"  stored="true"/>
    <dynamicField name="*_dts" type="date"    indexed="true"  stored="true" multiValued="true"/>
    <dynamicField name="*_p"  type="location" indexed="true" stored="true"/>
    <dynamicField name="*_srpt"  type="location_rpt" indexed="true" stored="true"/>

    <!-- some trie-coded dynamic fields for faster range queries -->
    <dynamicField name="*_ti" type="tint"    indexed="true"  stored="true"/>
    <dynamicField name="*_tis" type="tints"    indexed="true"  stored="true"/>
    <dynamicField name="*_tl" type="tlong"   indexed="true"  stored="true"/>
    <dynamicField name="*_tls" type="tlongs"   indexed="true"  stored="true"/>
    <dynamicField name="*_tf" type="tfloat"  indexed="true"  stored="true"/>
    <dynamicField name="*_tfs" type="tfloats"  indexed="true"  stored="true"/>
    <dynamicField name="*_td" type="tdouble" indexed="true"  stored="true"/>
    <dynamicField name="*_tds" type="tdoubles" indexed="true"  stored="true"/>
    <dynamicField name="*_tdt" type="tdate"  indexed="true"  stored="true"/>
    <dynamicField name="*_tdts" type="tdates"  indexed="true"  stored="true"/>

    <dynamicField name="ignored_*" type="ignored" multiValued="true"/>
    <dynamicField name="attr_*" type="text_general" indexed="true" stored="true" multiValued="true"/>

    <dynamicField name="random_*" type="random" />

    <!-- uncomment the following to ignore any fields that don't already match an existing
        field name or dynamic field, rather than reporting them as an error.
        alternately, change the type="ignored" to some other type e.g. "text" if you want
        unknown fields indexed and/or stored by default

        NB: use of "*" dynamic fields will disable field type guessing and adding
        unknown fields to the schema. -->
    <!--dynamicField name="*" type="ignored" multiValued="true" /-->

    <!-- Field to use to determine and enforce document uniqueness.
      Unless this field is marked with required="false", it will be a required field
    -->
    <uniqueKey>id</uniqueKey>

    <!-- copyField commands copy one field to another at the time a document
       is added to the index.  It's used either to index the same field differently,
       or to add multiple fields to the same field for easier/faster searching.

    <copyField source="sourceFieldName" dest="destinationFieldName"/>
    -->

    <!-- field type definitions. The "name" attribute is
       just a label to be used by field definitions.  The "class"
       attribute and any other attributes determine the real
       behavior of the fieldType.
         Class names starting with "solr" refer to java classes in a
       standard package such as org.apache.solr.analysis
    -->

    <!-- The StrField type is not analyzed, but indexed/stored verbatim.
       It supports doc values but in that case the field needs to be
       single-valued and either required or have a default value.
      -->
    <fieldType name="string" class="solr.StrField" sortMissingLast="true" docValues="true" />
    <fieldType name="strings" class="solr.StrField" sortMissingLast="true" multiValued="true" docValues="true" />

    <!-- boolean type: "true" or "false" -->
    <fieldType name="boolean" class="solr.BoolField" sortMissingLast="true"/>

    <fieldType name="booleans" class="solr.BoolField" sortMissingLast="true" multiValued="true"/>

    <!-- sortMissingLast and sortMissingFirst attributes are optional attributes are
         currently supported on types that are sorted internally as strings
         and on numeric types.
	     This includes "string","boolean", and, as of 3.5 (and 4.x),
	     int, float, long, date, double, including the "Trie" variants.
       - If sortMissingLast="true", then a sort on this field will cause documents
         without the field to come after documents with the field,
         regardless of the requested sort order (asc or desc).
       - If sortMissingFirst="true", then a sort on this field will cause documents
         without the field to come before documents with the field,
         regardless of the requested sort order.
       - If sortMissingLast="false" and sortMissingFirst="false" (the default),
         then default lucene sorting will be used which places docs without the
         field first in an ascending sort and last in a descending sort.
    -->

    <!--
      Default numeric field types. For faster range queries, consider the tint/tfloat/tlong/tdouble types.

      These fields support doc values, but they require the field to be
      single-valued and either be required or have a default value.
    -->
    <fieldType name="int" class="solr.TrieIntField" docValues="true" precisionStep="0" positionIncrementGap="0"/>
    <fieldType name="float" class="solr.TrieFloatField" docValues="true" precisionStep="0" positionIncrementGap="0"/>
    <fieldType name="long" class="solr.TrieLongField" docValues="true" precisionStep="0" positionIncrementGap="0"/>
    <fieldType name="double" class="solr.TrieDoubleField" docValues="true" precisionStep="0" positionIncrementGap="0"/>

    <fieldType name="ints" class="solr.TrieIntField" docValues="true" precisionStep="0" positionIncrementGap="0" multiValued="true"/>
    <fieldType name="floats" class="solr.TrieFloatField" docValues="true" precisionStep="0" positionIncrementGap="0" multiValued="true"/>
    <fieldType name="longs" class="solr.TrieLongField" docValues="true" precisionStep="0" positionIncrementGap="0" multiValued="true"/>
    <fieldType name="doubles" class="solr.TrieDoubleField" docValues="true" precisionStep="0" positionIncrementGap="0" multiValued="true"/>

    <!--
     Numeric field types that index each value at various levels of precision
     to accelerate range queries when the number of values between the range
     endpoints is large. See the javadoc for NumericRangeQuery for internal
     implementation details.

     Smaller precisionStep values (specified in bits) will lead to more tokens
     indexed per value, slightly larger index size, and faster range queries.
     A precisionStep of 0 disables indexing at different precision levels.
    -->
    <fieldType name="tint" class="solr.TrieIntField" docValues="true" precisionStep="8" positionIncrementGap="0"/>
    <fieldType name="tfloat" class="solr.TrieFloatField" docValues="true" precisionStep="8" positionIncrementGap="0"/>
    <fieldType name="tlong" class="solr.TrieLongField" docValues="true" precisionStep="8" positionIncrementGap="0"/>
    <fieldType name="tdouble" class="solr.TrieDoubleField" docValues="true" precisionStep="8" positionIncrementGap="0"/>

    <fieldType name="tints" class="solr.TrieIntField" docValues="true" precisionStep="8" positionIncrementGap="0" multiValued="true"/>
    <fieldType name="tfloats" class="solr.TrieFloatField" docValues="true" precisionStep="8" positionIncrementGap="0" multiValued="true"/>
    <fieldType name="tlongs" class="solr.TrieLongField" docValues="true" precisionStep="8" positionIncrementGap="0" multiValued="true"/>
    <fieldType name="tdoubles" class="solr.TrieDoubleField" docValues="true" precisionStep="8" positionIncrementGap="0" multiValued="true"/>

    <!-- The format for this date field is of the form 1995-12-31T23:59:59Z, and
         is a more restricted form of the canonical representation of dateTime
         http://www.w3.org/TR/xmlschema-2/#dateTime
         The trailing "Z" designates UTC time and is mandatory.
         Optional fractional seconds are allowed: 1995-12-31T23:59:59.999Z
         All other components are mandatory.

         Expressions can also be used to denote calculations that should be
         performed relative to "NOW" to determine the value, ie...

               NOW/HOUR
                  ... Round to the start of the current hour
               NOW-1DAY
                  ... Exactly 1 day prior to now
               NOW/DAY+6MONTHS+3DAYS
                  ... 6 months and 3 days in the future from the start of
                      the current day

         Consult the TrieDateField javadocs for more information.

         Note: For faster range queries, consider the tdate type
      -->
    <fieldType name="date" class="solr.TrieDateField" docValues="true" precisionStep="0" positionIncrementGap="0"/>
    <fieldType name="dates" class="solr.TrieDateField" docValues="true" precisionStep="0" positionIncrementGap="0" multiValued="true"/>

    <!-- A Trie based date field for faster date range queries and date faceting. -->
    <fieldType name="tdate" class="solr.TrieDateField" docValues="true" precisionStep="6" positionIncrementGap="0"/>

    <fieldType name="tdates" class="solr.TrieDateField" docValues="true" precisionStep="6" positionIncrementGap="0" multiValued="true"/>


    <!--Binary data type. The data should be sent/retrieved in as Base64 encoded Strings -->
    <fieldType name="binary" class="solr.BinaryField"/>

    <!-- The "RandomSortField" is not used to store or search any
         data.  You can declare fields of this type it in your schema
         to generate pseudo-random orderings of your docs for sorting
         or function purposes.  The ordering is generated based on the field
         name and the version of the index. As long as the index version
         remains unchanged, and the same field name is reused,
         the ordering of the docs will be consistent.
         If you want different psuedo-random orderings of documents,
         for the same version of the index, use a dynamicField and
         change the field name in the request.
     -->
    <fieldType name="random" class="solr.RandomSortField" indexed="true" />

    <!-- solr.TextField allows the specification of custom text analyzers
         specified as a tokenizer and a list of token filters. Different
         analyzers may be specified for indexing and querying.

         The optional positionIncrementGap puts space between multiple fields of
         this type on the same document, with the purpose of preventing false phrase
         matching across fields.

         For more info on customizing your analyzer chain, please see
         http://wiki.apache.org/solr/AnalyzersTokenizersTokenFilters
     -->

    <!-- One can also specify an existing Analyzer class that has a
         default constructor via the class attribute on the analyzer element.
         Example:
    <fieldType name="text_greek" class="solr.TextField">
      <analyzer class="org.apache.lucene.analysis.el.GreekAnalyzer"/>
    </fieldType>
    -->

    <!-- A text field that only splits on whitespace for exact matching of words -->
    <dynamicField name="*_ws" type="text_ws"  indexed="true"  stored="true"/>
    <fieldType name="text_ws" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.WhitespaceTokenizerFactory"/>
        </analyzer>
    </fieldType>

    <!-- A general text field that has reasonable, generic
         cross-language defaults: it tokenizes with StandardTokenizer,
	       removes stop words from case-insensitive "stopwords.txt"
	       (empty by default), and down cases.  At query time only, it
	       also applies synonyms.
	  -->
    <fieldType name="text_general" class="solr.TextField" positionIncrementGap="100" multiValued="true">
        <analyzer type="index">
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="stopwords.txt" />
            <!-- in this example, we will only use synonyms at query time
            <filter class="solr.SynonymFilterFactory" synonyms="index_synonyms.txt" ignoreCase="true" expand="false"/>
            -->
            <filter class="solr.LowerCaseFilterFactory"/>
        </analyzer>
        <analyzer type="query">
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="stopwords.txt" />
            <filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" expand="true"/>
            <filter class="solr.LowerCaseFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- A text field with defaults appropriate for English: it
         tokenizes with StandardTokenizer, removes English stop words
         (lang/stopwords_en.txt), down cases, protects words from protwords.txt, and
         finally applies Porter's stemming.  The query time analyzer
         also applies synonyms from synonyms.txt. -->
    <dynamicField name="*_txt_en" type="text_en"  indexed="true"  stored="true"/>
    <fieldType name="text_en" class="solr.TextField" positionIncrementGap="100">
        <analyzer type="index">
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <!-- in this example, we will only use synonyms at query time
            <filter class="solr.SynonymFilterFactory" synonyms="index_synonyms.txt" ignoreCase="true" expand="false"/>
            -->
            <!-- Case insensitive stop word removal.
            -->
            <filter class="solr.StopFilterFactory"
                    ignoreCase="true"
                    words="lang/stopwords_en.txt"
            />
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.EnglishPossessiveFilterFactory"/>
            <filter class="solr.KeywordMarkerFilterFactory" protected="protwords.txt"/>
            <!-- Optionally you may want to use this less aggressive stemmer instead of PorterStemFilterFactory:
            <filter class="solr.EnglishMinimalStemFilterFactory"/>
              -->
            <filter class="solr.PorterStemFilterFactory"/>
        </analyzer>
        <analyzer type="query">
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" expand="true"/>
            <filter class="solr.StopFilterFactory"
                    ignoreCase="true"
                    words="lang/stopwords_en.txt"
            />
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.EnglishPossessiveFilterFactory"/>
            <filter class="solr.KeywordMarkerFilterFactory" protected="protwords.txt"/>
            <!-- Optionally you may want to use this less aggressive stemmer instead of PorterStemFilterFactory:
            <filter class="solr.EnglishMinimalStemFilterFactory"/>
              -->
            <filter class="solr.PorterStemFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- A text field with defaults appropriate for English, plus
         aggressive word-splitting and autophrase features enabled.
         This field is just like text_en, except it adds
         WordDelimiterFilter to enable splitting and matching of
         words on case-change, alpha numeric boundaries, and
         non-alphanumeric chars.  This means certain compound word
         cases will work, for example query "wi fi" will match
         document "WiFi" or "wi-fi".
    -->
    <dynamicField name="*_txt_en_split" type="text_en_splitting"  indexed="true"  stored="true"/>
    <fieldType name="text_en_splitting" class="solr.TextField" positionIncrementGap="100" autoGeneratePhraseQueries="true">
        <analyzer type="index">
            <tokenizer class="solr.WhitespaceTokenizerFactory"/>
            <!-- in this example, we will only use synonyms at query time
            <filter class="solr.SynonymFilterFactory" synonyms="index_synonyms.txt" ignoreCase="true" expand="false"/>
            -->
            <!-- Case insensitive stop word removal.
            -->
            <filter class="solr.StopFilterFactory"
                    ignoreCase="true"
                    words="lang/stopwords_en.txt"
            />
            <filter class="solr.WordDelimiterFilterFactory" generateWordParts="1" generateNumberParts="1" catenateWords="1" catenateNumbers="1" catenateAll="0" splitOnCaseChange="1"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.KeywordMarkerFilterFactory" protected="protwords.txt"/>
            <filter class="solr.PorterStemFilterFactory"/>
        </analyzer>
        <analyzer type="query">
            <tokenizer class="solr.WhitespaceTokenizerFactory"/>
            <filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" expand="true"/>
            <filter class="solr.StopFilterFactory"
                    ignoreCase="true"
                    words="lang/stopwords_en.txt"
            />
            <filter class="solr.WordDelimiterFilterFactory" generateWordParts="1" generateNumberParts="1" catenateWords="0" catenateNumbers="0" catenateAll="0" splitOnCaseChange="1"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.KeywordMarkerFilterFactory" protected="protwords.txt"/>
            <filter class="solr.PorterStemFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- Less flexible matching, but less false matches.  Probably not ideal for product names,
         but may be good for SKUs.  Can insert dashes in the wrong place and still match. -->
    <dynamicField name="*_txt_en_split_tight" type="text_en_splitting_tight"  indexed="true"  stored="true"/>
    <fieldType name="text_en_splitting_tight" class="solr.TextField" positionIncrementGap="100" autoGeneratePhraseQueries="true">
        <analyzer>
            <tokenizer class="solr.WhitespaceTokenizerFactory"/>
            <filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" expand="false"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_en.txt"/>
            <filter class="solr.WordDelimiterFilterFactory" generateWordParts="0" generateNumberParts="0" catenateWords="1" catenateNumbers="1" catenateAll="0"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.KeywordMarkerFilterFactory" protected="protwords.txt"/>
            <filter class="solr.EnglishMinimalStemFilterFactory"/>
            <!-- this filter can remove any duplicate tokens that appear at the same position - sometimes
                 possible with WordDelimiterFilter in conjuncton with stemming. -->
            <filter class="solr.RemoveDuplicatesTokenFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- Just like text_general except it reverses the characters of
	       each token, to enable more efficient leading wildcard queries.
    -->
    <dynamicField name="*_txt_rev" type="text_general_rev"  indexed="true"  stored="true"/>
    <fieldType name="text_general_rev" class="solr.TextField" positionIncrementGap="100">
        <analyzer type="index">
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="stopwords.txt" />
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.ReversedWildcardFilterFactory" withOriginal="true"
                    maxPosAsterisk="3" maxPosQuestion="2" maxFractionAsterisk="0.33"/>
        </analyzer>
        <analyzer type="query">
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.SynonymFilterFactory" synonyms="synonyms.txt" ignoreCase="true" expand="true"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="stopwords.txt" />
            <filter class="solr.LowerCaseFilterFactory"/>
        </analyzer>
    </fieldType>

    <dynamicField name="*_phon_en" type="phonetic_en"  indexed="true"  stored="true"/>
    <fieldType name="phonetic_en" stored="false" indexed="true" class="solr.TextField" >
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.DoubleMetaphoneFilterFactory" inject="false"/>
        </analyzer>
    </fieldType>

    <!-- lowercases the entire field value, keeping it as a single token.  -->
    <dynamicField name="*_s_lower" type="lowercase"  indexed="true"  stored="true"/>
    <fieldType name="lowercase" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.KeywordTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory" />
        </analyzer>
    </fieldType>

    <!--
      Example of using PathHierarchyTokenizerFactory at index time, so
      queries for paths match documents at that path, or in descendent paths
    -->
    <dynamicField name="*_descendent_path" type="descendent_path"  indexed="true"  stored="true"/>
    <fieldType name="descendent_path" class="solr.TextField">
        <analyzer type="index">
            <tokenizer class="solr.PathHierarchyTokenizerFactory" delimiter="/" />
        </analyzer>
        <analyzer type="query">
            <tokenizer class="solr.KeywordTokenizerFactory" />
        </analyzer>
    </fieldType>

    <!--
      Example of using PathHierarchyTokenizerFactory at query time, so
      queries for paths match documents at that path, or in ancestor paths
    -->
    <dynamicField name="*_ancestor_path" type="ancestor_path"  indexed="true"  stored="true"/>
    <fieldType name="ancestor_path" class="solr.TextField">
        <analyzer type="index">
            <tokenizer class="solr.KeywordTokenizerFactory" />
        </analyzer>
        <analyzer type="query">
            <tokenizer class="solr.PathHierarchyTokenizerFactory" delimiter="/" />
        </analyzer>
    </fieldType>

    <!-- since fields of this type are by default not stored or indexed,
         any data added to them will be ignored outright.  -->
    <fieldType name="ignored" stored="false" indexed="false" docValues="false" multiValued="true" class="solr.StrField" />

    <!-- This point type indexes the coordinates as separate fields (subFields)
      If subFieldType is defined, it references a type, and a dynamic field
      definition is created matching *___<typename>.  Alternately, if
      subFieldSuffix is defined, that is used to create the subFields.
      Example: if subFieldType="double", then the coordinates would be
        indexed in fields myloc_0___double,myloc_1___double.
      Example: if subFieldSuffix="_d" then the coordinates would be indexed
        in fields myloc_0_d,myloc_1_d
      The subFields are an implementation detail of the fieldType, and end
      users normally should not need to know about them.
     -->
    <dynamicField name="*_point" type="point"  indexed="true"  stored="true"/>
    <fieldType name="point" class="solr.PointType" dimension="2" subFieldSuffix="_d"/>

    <!-- A specialized field for geospatial search. If indexed, this fieldType must not be multivalued. -->
    <fieldType name="location" class="solr.LatLonType" subFieldSuffix="_coordinate"/>

    <!-- An alternative geospatial field type new to Solr 4.  It supports multiValued and polygon shapes.
      For more information about this and other Spatial fields new to Solr 4, see:
      http://wiki.apache.org/solr/SolrAdaptersForLuceneSpatial4
    -->
    <fieldType name="location_rpt" class="solr.SpatialRecursivePrefixTreeFieldType"
               geo="true" distErrPct="0.025" maxDistErr="0.001" distanceUnits="kilometers" />



    <!-- some examples for different languages (generally ordered by ISO code) -->

    <!-- Arabic -->
    <dynamicField name="*_txt_ar" type="text_ar"  indexed="true"  stored="true"/>
    <fieldType name="text_ar" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <!-- for any non-arabic -->
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_ar.txt" />

            <filter class="solr.ArabicNormalizationFilterFactory"/>
            <filter class="solr.ArabicStemFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- Bulgarian -->
    <dynamicField name="*_txt_bg" type="text_bg"  indexed="true"  stored="true"/>
    <fieldType name="text_bg" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_bg.txt" />
            <filter class="solr.BulgarianStemFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- Catalan -->
    <dynamicField name="*_txt_ca" type="text_ca"  indexed="true"  stored="true"/>
    <fieldType name="text_ca" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <!-- removes l', etc -->
            <filter class="solr.ElisionFilterFactory" ignoreCase="true" articles="lang/contractions_ca.txt"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_ca.txt" />
            <filter class="solr.SnowballPorterFilterFactory" language="Catalan"/>
        </analyzer>
    </fieldType>

    <!-- CJK bigram (see text_ja for a Japanese configuration using morphological analysis) -->
    <dynamicField name="*_txt_cjk" type="text_cjk"  indexed="true"  stored="true"/>
    <fieldType name="text_cjk" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <!-- normalize width before bigram, as e.g. half-width dakuten combine  -->
            <filter class="solr.CJKWidthFilterFactory"/>
            <!-- for any non-CJK -->
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.CJKBigramFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- Czech -->
    <dynamicField name="*_txt_cz" type="text_cz"  indexed="true"  stored="true"/>
    <fieldType name="text_cz" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_cz.txt" />
            <filter class="solr.CzechStemFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- Danish -->
    <dynamicField name="*_txt_da" type="text_da"  indexed="true"  stored="true"/>
    <fieldType name="text_da" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_da.txt" format="snowball" />
            <filter class="solr.SnowballPorterFilterFactory" language="Danish"/>
        </analyzer>
    </fieldType>

    <!-- German -->
    <dynamicField name="*_txt_de" type="text_de"  indexed="true"  stored="true"/>
    <fieldType name="text_de" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_de.txt" format="snowball" />
            <filter class="solr.GermanNormalizationFilterFactory"/>
            <filter class="solr.GermanLightStemFilterFactory"/>
            <!-- less aggressive: <filter class="solr.GermanMinimalStemFilterFactory"/> -->
            <!-- more aggressive: <filter class="solr.SnowballPorterFilterFactory" language="German2"/> -->
        </analyzer>
    </fieldType>

    <!-- Greek -->
    <dynamicField name="*_txt_el" type="text_el"  indexed="true"  stored="true"/>
    <fieldType name="text_el" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <!-- greek specific lowercase for sigma -->
            <filter class="solr.GreekLowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="false" words="lang/stopwords_el.txt" />
            <filter class="solr.GreekStemFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- Spanish -->
    <dynamicField name="*_txt_es" type="text_es"  indexed="true"  stored="true"/>
    <fieldType name="text_es" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_es.txt" format="snowball" />
            <filter class="solr.SpanishLightStemFilterFactory"/>
            <!-- more aggressive: <filter class="solr.SnowballPorterFilterFactory" language="Spanish"/> -->
        </analyzer>
    </fieldType>

    <!-- Basque -->
    <dynamicField name="*_txt_eu" type="text_eu"  indexed="true"  stored="true"/>
    <fieldType name="text_eu" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_eu.txt" />
            <filter class="solr.SnowballPorterFilterFactory" language="Basque"/>
        </analyzer>
    </fieldType>

    <!-- Persian -->
    <dynamicField name="*_txt_fa" type="text_fa"  indexed="true"  stored="true"/>
    <fieldType name="text_fa" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <!-- for ZWNJ -->
            <charFilter class="solr.PersianCharFilterFactory"/>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.ArabicNormalizationFilterFactory"/>
            <filter class="solr.PersianNormalizationFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_fa.txt" />
        </analyzer>
    </fieldType>

    <!-- Finnish -->
    <dynamicField name="*_txt_fi" type="text_fi"  indexed="true"  stored="true"/>
    <fieldType name="text_fi" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_fi.txt" format="snowball" />
            <filter class="solr.SnowballPorterFilterFactory" language="Finnish"/>
            <!-- less aggressive: <filter class="solr.FinnishLightStemFilterFactory"/> -->
        </analyzer>
    </fieldType>

    <!-- French -->
    <dynamicField name="*_txt_fr" type="text_fr"  indexed="true"  stored="true"/>
    <fieldType name="text_fr" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <!-- removes l', etc -->
            <filter class="solr.ElisionFilterFactory" ignoreCase="true" articles="lang/contractions_fr.txt"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_fr.txt" format="snowball" />
            <filter class="solr.FrenchLightStemFilterFactory"/>
            <!-- less aggressive: <filter class="solr.FrenchMinimalStemFilterFactory"/> -->
            <!-- more aggressive: <filter class="solr.SnowballPorterFilterFactory" language="French"/> -->
        </analyzer>
    </fieldType>

    <!-- Irish -->
    <dynamicField name="*_txt_ga" type="text_ga"  indexed="true"  stored="true"/>
    <fieldType name="text_ga" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <!-- removes d', etc -->
            <filter class="solr.ElisionFilterFactory" ignoreCase="true" articles="lang/contractions_ga.txt"/>
            <!-- removes n-, etc. position increments is intentionally false! -->
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/hyphenations_ga.txt"/>
            <filter class="solr.IrishLowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_ga.txt"/>
            <filter class="solr.SnowballPorterFilterFactory" language="Irish"/>
        </analyzer>
    </fieldType>

    <!-- Galician -->
    <dynamicField name="*_txt_gl" type="text_gl"  indexed="true"  stored="true"/>
    <fieldType name="text_gl" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_gl.txt" />
            <filter class="solr.GalicianStemFilterFactory"/>
            <!-- less aggressive: <filter class="solr.GalicianMinimalStemFilterFactory"/> -->
        </analyzer>
    </fieldType>

    <!-- Hindi -->
    <dynamicField name="*_txt_hi" type="text_hi"  indexed="true"  stored="true"/>
    <fieldType name="text_hi" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <!-- normalizes unicode representation -->
            <filter class="solr.IndicNormalizationFilterFactory"/>
            <!-- normalizes variation in spelling -->
            <filter class="solr.HindiNormalizationFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_hi.txt" />
            <filter class="solr.HindiStemFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- Hungarian -->
    <dynamicField name="*_txt_hu" type="text_hu"  indexed="true"  stored="true"/>
    <fieldType name="text_hu" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_hu.txt" format="snowball" />
            <filter class="solr.SnowballPorterFilterFactory" language="Hungarian"/>
            <!-- less aggressive: <filter class="solr.HungarianLightStemFilterFactory"/> -->
        </analyzer>
    </fieldType>

    <!-- Armenian -->
    <dynamicField name="*_txt_hy" type="text_hy"  indexed="true"  stored="true"/>
    <fieldType name="text_hy" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_hy.txt" />
            <filter class="solr.SnowballPorterFilterFactory" language="Armenian"/>
        </analyzer>
    </fieldType>

    <!-- Indonesian -->
    <dynamicField name="*_txt_id" type="text_id"  indexed="true"  stored="true"/>
    <fieldType name="text_id" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_id.txt" />
            <!-- for a less aggressive approach (only inflectional suffixes), set stemDerivational to false -->
            <filter class="solr.IndonesianStemFilterFactory" stemDerivational="true"/>
        </analyzer>
    </fieldType>

    <!-- Italian -->
    <dynamicField name="*_txt_it" type="text_it"  indexed="true"  stored="true"/>
    <fieldType name="text_it" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <!-- removes l', etc -->
            <filter class="solr.ElisionFilterFactory" ignoreCase="true" articles="lang/contractions_it.txt"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_it.txt" format="snowball" />
            <filter class="solr.ItalianLightStemFilterFactory"/>
            <!-- more aggressive: <filter class="solr.SnowballPorterFilterFactory" language="Italian"/> -->
        </analyzer>
    </fieldType>

    <!-- Japanese using morphological analysis (see text_cjk for a configuration using bigramming)

         NOTE: If you want to optimize search for precision, use default operator AND in your query
         parser config with <solrQueryParser defaultOperator="AND"/> further down in this file.  Use
         OR if you would like to optimize for recall (default).
    -->
    <dynamicField name="*_txt_ja" type="text_ja"  indexed="true"  stored="true"/>
    <fieldType name="text_ja" class="solr.TextField" positionIncrementGap="100" autoGeneratePhraseQueries="false">
        <analyzer>
            <!-- Kuromoji Japanese morphological analyzer/tokenizer (JapaneseTokenizer)

               Kuromoji has a search mode (default) that does segmentation useful for search.  A heuristic
               is used to segment compounds into its parts and the compound itself is kept as synonym.

               Valid values for attribute mode are:
                  normal: regular segmentation
                  search: segmentation useful for search with synonyms compounds (default)
                extended: same as search mode, but unigrams unknown words (experimental)

               For some applications it might be good to use search mode for indexing and normal mode for
               queries to reduce recall and prevent parts of compounds from being matched and highlighted.
               Use <analyzer type="index"> and <analyzer type="query"> for this and mode normal in query.

               Kuromoji also has a convenient user dictionary feature that allows overriding the statistical
               model with your own entries for segmentation, part-of-speech tags and readings without a need
               to specify weights.  Notice that user dictionaries have not been subject to extensive testing.

               User dictionary attributes are:
                         userDictionary: user dictionary filename
                 userDictionaryEncoding: user dictionary encoding (default is UTF-8)

               See lang/userdict_ja.txt for a sample user dictionary file.

               Punctuation characters are discarded by default.  Use discardPunctuation="false" to keep them.

               See http://wiki.apache.org/solr/JapaneseLanguageSupport for more on Japanese language support.
            -->
            <tokenizer class="solr.JapaneseTokenizerFactory" mode="search"/>
            <!--<tokenizer class="solr.JapaneseTokenizerFactory" mode="search" userDictionary="lang/userdict_ja.txt"/>-->
            <!-- Reduces inflected verbs and adjectives to their base/dictionary forms  -->
            <filter class="solr.JapaneseBaseFormFilterFactory"/>
            <!-- Removes tokens with certain part-of-speech tags -->
            <filter class="solr.JapanesePartOfSpeechStopFilterFactory" tags="lang/stoptags_ja.txt" />
            <!-- Normalizes full-width romaji to half-width and half-width kana to full-width (Unicode NFKC subset) -->
            <filter class="solr.CJKWidthFilterFactory"/>
            <!-- Removes common tokens typically not useful for search, but have a negative effect on ranking -->
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_ja.txt" />
            <!-- Normalizes common katakana spelling variations by removing any last long sound character (U+30FC) -->
            <filter class="solr.JapaneseKatakanaStemFilterFactory" minimumLength="4"/>
            <!-- Lower-cases romaji characters -->
            <filter class="solr.LowerCaseFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- Latvian -->
    <dynamicField name="*_txt_lv" type="text_lv"  indexed="true"  stored="true"/>
    <fieldType name="text_lv" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_lv.txt" />
            <filter class="solr.LatvianStemFilterFactory"/>
        </analyzer>
    </fieldType>

    <!-- Dutch -->
    <dynamicField name="*_txt_nl" type="text_nl"  indexed="true"  stored="true"/>
    <fieldType name="text_nl" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_nl.txt" format="snowball" />
            <filter class="solr.StemmerOverrideFilterFactory" dictionary="lang/stemdict_nl.txt" ignoreCase="false"/>
            <filter class="solr.SnowballPorterFilterFactory" language="Dutch"/>
        </analyzer>
    </fieldType>

    <!-- Norwegian -->
    <dynamicField name="*_txt_no" type="text_no"  indexed="true"  stored="true"/>
    <fieldType name="text_no" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_no.txt" format="snowball" />
            <filter class="solr.SnowballPorterFilterFactory" language="Norwegian"/>
            <!-- less aggressive: <filter class="solr.NorwegianLightStemFilterFactory"/> -->
            <!-- singular/plural: <filter class="solr.NorwegianMinimalStemFilterFactory"/> -->
        </analyzer>
    </fieldType>

    <!-- Portuguese -->
    <dynamicField name="*_txt_pt" type="text_pt"  indexed="true"  stored="true"/>
    <fieldType name="text_pt" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_pt.txt" format="snowball" />
            <filter class="solr.PortugueseLightStemFilterFactory"/>
            <!-- less aggressive: <filter class="solr.PortugueseMinimalStemFilterFactory"/> -->
            <!-- more aggressive: <filter class="solr.SnowballPorterFilterFactory" language="Portuguese"/> -->
            <!-- most aggressive: <filter class="solr.PortugueseStemFilterFactory"/> -->
        </analyzer>
    </fieldType>

    <!-- Romanian -->
    <dynamicField name="*_txt_ro" type="text_ro"  indexed="true"  stored="true"/>
    <fieldType name="text_ro" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_ro.txt" />
            <filter class="solr.SnowballPorterFilterFactory" language="Romanian"/>
        </analyzer>
    </fieldType>

    <!-- Russian -->
    <dynamicField name="*_txt_ru" type="text_ru"  indexed="true"  stored="true"/>
    <fieldType name="text_ru" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_ru.txt" format="snowball" />
            <filter class="solr.SnowballPorterFilterFactory" language="Russian"/>
            <!-- less aggressive: <filter class="solr.RussianLightStemFilterFactory"/> -->
        </analyzer>
    </fieldType>

    <!-- Swedish -->
    <dynamicField name="*_txt_sv" type="text_sv"  indexed="true"  stored="true"/>
    <fieldType name="text_sv" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_sv.txt" format="snowball" />
            <filter class="solr.SnowballPorterFilterFactory" language="Swedish"/>
            <!-- less aggressive: <filter class="solr.SwedishLightStemFilterFactory"/> -->
        </analyzer>
    </fieldType>

    <!-- Thai -->
    <dynamicField name="*_txt_th" type="text_th"  indexed="true"  stored="true"/>
    <fieldType name="text_th" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.ThaiTokenizerFactory"/>
            <filter class="solr.LowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="true" words="lang/stopwords_th.txt" />
        </analyzer>
    </fieldType>

    <!-- Turkish -->
    <dynamicField name="*_txt_tr" type="text_tr"  indexed="true"  stored="true"/>
    <fieldType name="text_tr" class="solr.TextField" positionIncrementGap="100">
        <analyzer>
            <tokenizer class="solr.StandardTokenizerFactory"/>
            <filter class="solr.TurkishLowerCaseFilterFactory"/>
            <filter class="solr.StopFilterFactory" ignoreCase="false" words="lang/stopwords_tr.txt" />
            <filter class="solr.SnowballPorterFilterFactory" language="Turkish"/>
        </analyzer>
    </fieldType>

    <!-- Similarity is the scoring routine for each document vs. a query.
       A custom Similarity or SimilarityFactory may be specified here, but
       the default is fine for most applications.
       For more info: http://wiki.apache.org/solr/SchemaXml#Similarity
    -->
    <!--
     <similarity class="com.example.solr.CustomSimilarityFactory">
       <str name="paramkey">param value</str>
     </similarity>
    -->

</schema>
```
and then you have to do:
```
$ sudo service solr restart
$ sudo python3.6 manage.py build_solr_schema --filename=/var/solr/data/haystacksovothinksearch/conf/schema.xml && curl 'http://localhost:8983/solr/admin/cores?action=RELOAD&core=haystacksovothinksearch&wt=json&indent=true'
$ sudo python3.6 manage.py rebuild_index
```
that's all for now

