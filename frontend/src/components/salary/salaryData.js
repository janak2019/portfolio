// Ministry of Finance salary scale effective from 2083 Shrawan 1.
export const salaryLevels = [
// निजामती सेवा
  { id: "chief-secretary", category: "civil", label: "मुख्य सचिव", basic: 54823, maxGrade: 2, gradeRate: 12531 },
  { id: "ra-pa-distinguished", category: "civil", label: "रा.प. विशिष्ट", basic: 79240, maxGrade: 2, gradeRate: 34683 },
  { id: "ra-secretary-province", category: "civil", label: "रा. सचिव (प्रदेश प्रयोजन)", basic: 66433, maxGrade: 0, gradeRate: 0 },
  { id: "ra-pa-first", category: "civil", label: "रा.प. प्रथम", basic: 62866, maxGrade: 7, gradeRate: 20852 },
  { id: "ra-pa-second", category: "civil", label: "रा.प. द्वितीय", basic: 52311, maxGrade: 5, gradeRate: 19678 },
  { id: "ra-pa-third", category: "civil", label: "रा.प. तृतीय", basic: 48085, maxGrade: 8, gradeRate: 19602 },
  { id: "ra-pa-non-gazetted-first-pension", category: "civil", label: "रा.प.अनं.प्रथम श्रेणी (अ.मा. पेन्सन प्रयोजन)", basic: 49176, maxGrade: 0, gradeRate: 0 },
  { id: "ra-pa-non-gazetted-first", category: "civil", label: "रा.प.अनं.प्रथम", basic: 32503, maxGrade: 10, gradeRate: 12793 },
  { id: "ra-pa-non-gazetted-second-pension", category: "civil", label: "रा.प.अनं.द्वितीय श्रेणी (अ.मा. पेन्सन प्रयोजन)", basic: 34709, maxGrade: 0, gradeRate: 0 },
  { id: "ra-pa-non-gazetted-second", category: "civil", label: "रा.प.अनं.द्वितीय", basic: 36192, maxGrade: 10, gradeRate: 12006 },
  { id: "ra-pa-non-gazetted-third", category: "civil", label: "रा.प.अनं.तृतीय", basic: 30372, maxGrade: 7, gradeRate: 10912 },
  { id: "ra-pa-non-gazetted-fourth", category: "civil", label: "रा.प.अनं.चतुर्थ", basic: 29650, maxGrade: 6, gradeRate: 954 },
  { id: "level-five-13", category: "civil", label: "पाँचौं स्तर (क्र.सं. १३)", basic: 44517, maxGrade: 4, gradeRate: 15248 },
  { id: "level-four-14", category: "civil", label: "चतुर्थ स्तर (क्र.सं. १४)", basic: 43045, maxGrade: 2, gradeRate: 14650 },
  { id: "level-three-15", category: "civil", label: "तृतीय स्तर (क्र.सं. १५)", basic: 39833, maxGrade: 2, gradeRate: 13630 },
  { id: "level-two-16", category: "civil", label: "द्वितीय स्तर (क्र.सं. १६)", basic: 36693, maxGrade: 2, gradeRate: 11222 },
  { id: "level-one-17", category: "civil", label: "प्रथम स्तर (क्र.सं. १७)", basic: 32707, maxGrade: 2, gradeRate: 10910 },
  { id: "level-five-18", category: "civil", label: "पाँचौं स्तर (क्र.सं. १८)", basic: 43584, maxGrade: 4, gradeRate: 14680 },
  { id: "level-four-19", category: "civil", label: "चतुर्थ स्तर (क्र.सं. १९)", basic: 41331, maxGrade: 2, gradeRate: 1350 },
  { id: "level-three-20", category: "civil", label: "तृतीय स्तर (क्र.सं. २०)", basic: 36673, maxGrade: 2, gradeRate: 1222 },
  { id: "level-two-21", category: "civil", label: "द्वितीय स्तर (क्र.सं. २१)", basic: 32701, maxGrade: 2, gradeRate: 1090 },
  { id: "level-one-22", category: "civil", label: "प्रथम स्तर (क्र.सं. २२)", basic: 30373, maxGrade: 2, gradeRate: 1012 },
  { id: "halkara-five", category: "civil", label: "हलकारा — पाँचौं स्तर", basic: 37267, maxGrade: 4, gradeRate: 1242 },
  { id: "halkara-four", category: "civil", label: "हलकारा — चतुर्थ स्तर", basic: 33758, maxGrade: 2, gradeRate: 1126 },
  { id: "halkara-three", category: "civil", label: "हलकारा — तृतीय स्तर", basic: 31591, maxGrade: 2, gradeRate: 1063 },
  { id: "halkara-two", category: "civil", label: "हलकारा — द्वितीय स्तर", basic: 30946, maxGrade: 2, gradeRate: 1004 },
  { id: "halkara-one", category: "civil", label: "हलकारा — प्रथम स्तर", basic: 28690, maxGrade: 2, gradeRate: 956 },
  { id: "hulaki-five", category: "civil", label: "हुलाकी — पाँचौं स्तर", basic: 36444, maxGrade: 4, gradeRate: 1215 },
  { id: "hulaki-four", category: "civil", label: "हुलाकी — चतुर्थ स्तर", basic: 32966, maxGrade: 2, gradeRate: 1099 },
  { id: "hulaki-three", category: "civil", label: "हुलाकी — तृतीय स्तर", basic: 30652, maxGrade: 2, gradeRate: 1022 },
  { id: "hulaki-two", category: "civil", label: "हुलाकी — द्वितीय स्तर", basic: 28595, maxGrade: 2, gradeRate: 946 },
  { id: "hulaki-one", category: "civil", label: "हुलाकी — प्रथम स्तर", basic: 27704, maxGrade: 2, gradeRate: 923 },
  { id: "office-assistant-five", category: "civil", label: "कार्यालय सहयोगी — पाँचौं स्तर", basic: 36142, maxGrade: 4, gradeRate: 1205 },
  { id: "office-assistant-four", category: "civil", label: "कार्यालय सहयोगी — चतुर्थ स्तर", basic: 32701, maxGrade: 2, gradeRate: 1090 },
  { id: "office-assistant-three", category: "civil", label: "कार्यालय सहयोगी — तृतीय स्तर", basic: 30373, maxGrade: 2, gradeRate: 1012 },
  { id: "office-assistant-two", category: "civil", label: "कार्यालय सहयोगी — द्वितीय स्तर", basic: 28690, maxGrade: 2, gradeRate: 956 },
  { id: "office-assistant-one", category: "civil", label: "कार्यालय सहयोगी — प्रथम स्तर", basic: 27792, maxGrade: 2, gradeRate: 906 },
  // नेपाल प्रहरी
  { id: "police-1", category: "police", label: "प्र. महा-निरीक्षक", basic: 79220, maxGrade: 2 },
  { id: "police-2", category: "police", label: "प्र. अ. महा-निरीक्षक", basic: 79220, maxGrade: 2 },
  { id: "police-3", category: "police", label: "प्र. ना. महा-निरीक्षक", basic: 67045, maxGrade: 3 },
  { id: "police-4", category: "police", label: "प्र. वरिष्ठ उपरीक्षक", basic: 62466, maxGrade: 4 },
  { id: "police-5", category: "police", label: "प्र. उपरीक्षक", basic: 57507, maxGrade: 5 },
  { id: "police-6", category: "police", label: "प्र. ना. उपरीक्षक", basic: 53611, maxGrade: 5 },
  { id: "police-7", category: "police", label: "प्र. निरीक्षक", basic: 48085, maxGrade: 5 },
  { id: "police-8", category: "police", label: "प्र. वरिष्ठ नायव निरीक्षक", basic: 45098, maxGrade: 5 },
  { id: "police-9", category: "police", label: "प्र. ना. निरीक्षक", basic: 35203, maxGrade: 5 },
  { id: "police-10", category: "police", label: "प्र. सहायक निरीक्षक", basic: 36142, maxGrade: 7 },
  { id: "police-11", category: "police", label: "प्र. व. हवल्दार", basic: 31392, maxGrade: 6 },
  { id: "police-12", category: "police", label: "प्र. हवल्दार", basic: 30373, maxGrade: 7 },
  { id: "police-13", category: "police", label: "प्र. सहायक हवल्दार", basic: 29209, maxGrade: 5 },
  { id: "police-14", category: "police", label: "प्र. जवान", basic: 28690, maxGrade: 5 },
  { id: "police-15", category: "police", label: "रिक्रुट", basic: 27792, maxGrade: 0 },

  // प्रहरी कार्यालय सहयोगी
  { id: "police-16", category: "police", label: "प्र.का.स. पाँचौं स्तर", basic: 36142, maxGrade: 4 },
  { id: "police-17", category: "police", label: "प्र.का.स. चतुर्थ स्तर", basic: 32701, maxGrade: 2 },
  { id: "police-18", category: "police", label: "प्र.का.स. तृतीय स्तर", basic: 30373, maxGrade: 2 },
  { id: "police-19", category: "police", label: "प्र.का.स. द्वितीय स्तर", basic: 28690, maxGrade: 2 },
  { id: "police-20", category: "police", label: "प्र.का.स. प्रथम स्तर", basic: 27792, maxGrade: 2 },
  // नेपाली सेना
  { id: "army-1", category: "army", label: "प्रधान सेनापति", basic: 54823, maxGrade: 2 },
  { id: "army-2", category: "army", label: "रथी", basic: 59143, maxGrade: 2 },
  { id: "army-3", category: "army", label: "उप रथी", basic: 59290, maxGrade: 2 },
  { id: "army-4", category: "army", label: "सहायक रथी", basic: 67054, maxGrade: 5 },
  { id: "army-5", category: "army", label: "महा सेनानी", basic: 52866, maxGrade: 4 },
  { id: "army-6", category: "army", label: "प्रमुख सेनानी", basic: 47907, maxGrade: 6 },
  { id: "army-7", category: "army", label: "सेनानी", basic: 43691, maxGrade: 5 },
  { id: "army-8", category: "army", label: "सह-सेनानी", basic: 41932, maxGrade: 6 },
  { id: "army-9", category: "army", label: "उप-सेनानी", basic: 49613, maxGrade: 6 },
  { id: "army-10", category: "army", label: "सहायक सेनानी", basic: 40562, maxGrade: 0 },
  { id: "army-11", category: "army", label: "अधिकृत क्याडेट", basic: 47960, maxGrade: 0 },
  { id: "army-12", category: "army", label: "मानार्थ सह-सेनानी", basic: 47603, maxGrade: 0 },
  { id: "army-13", category: "army", label: "मानार्थ उप-सेनानी", basic: 46625, maxGrade: 0 },
  { id: "army-14", category: "army", label: "प्रमुख सुवेदार", basic: 45085, maxGrade: 2 },
  { id: "army-15", category: "army", label: "सुवेदार", basic: 38358, maxGrade: 7 },
  { id: "army-16", category: "army", label: "जमदार", basic: 36142, maxGrade: 6 },
  { id: "army-17", category: "army", label: "हु.गा.हुद्दा", basic: 31392, maxGrade: 6 },
  { id: "army-18", category: "army", label: "अमलदार", basic: 30373, maxGrade: 7 },
  { id: "army-19", category: "army", label: "प्युठ", basic: 32289, maxGrade: 7 },
  { id: "army-20", category: "army", label: "सिपाही", basic: 28690, maxGrade: 8 },
  { id: "army-21", category: "army", label: "रिक्रुट", basic: 27792, maxGrade: 0 },
  { id: "army-22", category: "army", label: "मेन्ट क्राफ्टेट", basic: 27792, maxGrade: 10 },

  // विमान समूह सम्बन्धी
  { id: "army-23", category: "army", label: "पाइलट उपरी", basic: 54853, maxGrade: 2 },
  { id: "army-24", category: "army", label: "सहायक रथी", basic: 67798, maxGrade: 5 },
  { id: "army-25", category: "army", label: "महा सेनानी", basic: 64600, maxGrade: 5 },
  { id: "army-26", category: "army", label: "प्रमुख सेनानी", basic: 64864, maxGrade: 5 },
  { id: "army-27", category: "army", label: "सेनानी", basic: 64848, maxGrade: 5 },
  { id: "army-28", category: "army", label: "सह-सेनानी", basic: 60050, maxGrade: 6 },
  { id: "army-29", category: "army", label: "उप-सेनानी", basic: 57622, maxGrade: 6 },
  { id: "army-30", category: "army", label: "वरिष्ठ सुवेदार", basic: 46795, maxGrade: 7 },
  { id: "army-31", category: "army", label: "सुवेदार", basic: 40196, maxGrade: 7 },
  { id: "army-32", category: "army", label: "जमदार", basic: 38479, maxGrade: 6 },
  { id: "army-33", category: "army", label: "हुद्दा", basic: 34755, maxGrade: 6 },
  { id: "army-34", category: "army", label: "अमलदार", basic: 31347, maxGrade: 7 },

  // नन कम्बाटेन्ट
  { id: "army-35", category: "army", label: "फलोअर्स पाँचौं स्तर", basic: 36142, maxGrade: 4 },
  { id: "army-36", category: "army", label: "फलोअर्स चतुर्थ स्तर", basic: 32701, maxGrade: 2 },
  { id: "army-37", category: "army", label: "फलोअर्स तृतीय स्तर", basic: 30373, maxGrade: 2 },
  { id: "army-38", category: "army", label: "फलोअर्स द्वितीय स्तर", basic: 28690, maxGrade: 2 },
  { id: "army-39", category: "army", label: "फलोअर्स प्रथम स्तर", basic: 27792, maxGrade: 2 },
  
  // सशस्त्र प्रहरी बल, नेपाल

  { id: "apf-1", category: "apf", label: "स.प्र. महा-निरीक्षक", basic: 79220, maxGrade: 2 },
  { id: "apf-2", category: "apf", label: "स.प्र. अ. महा-निरीक्षक", basic: 79220, maxGrade: 2 },
  { id: "apf-3", category: "apf", label: "स.प्र. ना. महा-निरीक्षक", basic: 67045, maxGrade: 3 },
  { id: "apf-4", category: "apf", label: "स.प्र. वरिष्ठ उपरीक्षक", basic: 62466, maxGrade: 4 },
  { id: "apf-5", category: "apf", label: "स.प्र. उपरीक्षक", basic: 57507, maxGrade: 5 },
  { id: "apf-6", category: "apf", label: "स.प्र. ना. उपरीक्षक", basic: 53611, maxGrade: 5 },
  { id: "apf-7", category: "apf", label: "स.प्र. निरीक्षक", basic: 48085, maxGrade: 8 },
  { id: "apf-8", category: "apf", label: "स.प्र. वरिष्ठ नायव निरीक्षक", basic: 45098, maxGrade: 2 },
  { id: "apf-9", category: "apf", label: "स.प्र. ना. निरीक्षक", basic: 35203, maxGrade: 6 },
  { id: "apf-10", category: "apf", label: "स.प्र. सहायक निरीक्षक", basic: 36142, maxGrade: 7 },
  { id: "apf-11", category: "apf", label: "स.प्र. व. हवल्दार", basic: 31392, maxGrade: 6 },
  { id: "apf-12", category: "apf", label: "स.प्र. हवल्दार", basic: 30373, maxGrade: 7 },
  { id: "apf-13", category: "apf", label: "स.प्र. सहायक हवल्दार", basic: 29209, maxGrade: 5 },
  { id: "apf-14", category: "apf", label: "स.प्र. जवान", basic: 28690, maxGrade: 8 },
  { id: "apf-15", category: "apf", label: "रिक्रुट श्रेणी विहीन", basic: 27792, maxGrade: 0 },
  { id: "apf-16", category: "apf", label: "फलोअर्स (सयश समेत)", basic: 27792, maxGrade: 10 },

  // सशस्त्र प्रहरी कार्यालय सहयोगी
  { id: "apf-17", category: "apf", label: "प्र.का.स. पाँचौं स्तर", basic: 36142, maxGrade: 4 },
  { id: "apf-18", category: "apf", label: "प्र.का.स. चतुर्थ स्तर", basic: 32701, maxGrade: 2 },
  { id: "apf-19", category: "apf", label: "प्र.का.स. तृतीय स्तर", basic: 30373, maxGrade: 2 },
  { id: "apf-20", category: "apf", label: "प्र.का.स. द्वितीय स्तर", basic: 28690, maxGrade: 2 },
  { id: "apf-21", category: "apf", label: "प्र.का.स. प्रथम स्तर", basic: 27792, maxGrade: 2 },
// स्वास्थ्य सेवा
  { id: "health-1", category: "health", label: "अधिकृत बाह्रौं", basic: 79220, maxGrade: 2 },
  { id: "health-2", category: "health", label: "अधिकृत एघारौं", basic: 66539, maxGrade: 3 },
  { id: "health-3", category: "health", label: "अधिकृत दशौं", basic: 62466, maxGrade: 4 },
  { id: "health-4", category: "health", label: "अधिकृत नवौं", basic: 57659, maxGrade: 4 },
  { id: "health-5", category: "health", label: "अधिकृत आठौं", basic: 53611, maxGrade: 4 },
  { id: "health-6", category: "health", label: "अधिकृत सातौं", basic: 50436, maxGrade: 5 },
  { id: "health-7", category: "health", label: "अधिकृत छैठौं", basic: 48085, maxGrade: 5 },
  { id: "health-8", category: "health", label: "वरिष्ठ पाँचौं", basic: 41517, maxGrade: 5 },
  { id: "health-9", category: "health", label: "सहायक पाँचौं", basic: 35203, maxGrade: 6 },
  { id: "health-10", category: "health", label: "सहायक चौथौं", basic: 36142, maxGrade: 7 },
  { id: "health-11", category: "health", label: "सहायक तेस्रो", basic: 30373, maxGrade: 7 },
  { id: "health-12", category: "health", label: "सहायक दोस्रो", basic: 28690, maxGrade: 7 },
  { id: "health-13", category: "health", label: "सहायक प्रथम", basic: 27792, maxGrade: 10 },

  
  // प्रदेश तथा स्थानीय तह निवृतिभरण प्रयोजन
  { id: "province-local-1", category: "province-local", label: "अधिकृत एघारौं", basic: 66539, maxGrade: 5 },
  { id: "province-local-2", category: "province-local", label: "अधिकृत दशौं", basic: 62466, maxGrade: 7 },
  { id: "province-local-3", category: "province-local", label: "अधिकृत नवौं", basic: 57659, maxGrade: 7 },
  { id: "province-local-4", category: "province-local", label: "अधिकृत आठौं", basic: 53611, maxGrade: 7 },
  { id: "province-local-5", category: "province-local", label: "अधिकृत सातौं", basic: 50436, maxGrade: 8 },
  { id: "province-local-6", category: "province-local", label: "अधिकृत छैठौं", basic: 48085, maxGrade: 8 },
  { id: "province-local-7", category: "province-local", label: "सहायक पाँचौं", basic: 35203, maxGrade: 10 },
  { id: "province-local-8", category: "province-local", label: "सहायक चौथौं", basic: 36142, maxGrade: 10 },

  // हेभी सवारी चालक
  { id: "province-local-9", category: "province-local", label: "हेभी सवारी चालक - पाँचौं स्तर", basic: 45777, maxGrade: 4 },
  { id: "province-local-10", category: "province-local", label: "हेभी सवारी चालक - चतुर्थ स्तर", basic: 43784, maxGrade: 2 },
  { id: "province-local-11", category: "province-local", label: "हेभी सवारी चालक - तृतीय स्तर", basic: 41321, maxGrade: 2 },
  { id: "province-local-12", category: "province-local", label: "हेभी सवारी चालक - द्वितीय स्तर", basic: 36673, maxGrade: 2 },
  { id: "province-local-13", category: "province-local", label: "हेभी सवारी चालक - प्रथम स्तर", basic: 32701, maxGrade: 2 },

  // हलुका सवारी चालक
  { id: "province-local-14", category: "province-local", label: "हलुका सवारी चालक - पाँचौं स्तर", basic: 43784, maxGrade: 4 },
  { id: "province-local-15", category: "province-local", label: "हलुका सवारी चालक - चतुर्थ स्तर", basic: 41321, maxGrade: 2 },
  { id: "province-local-16", category: "province-local", label: "हलुका सवारी चालक - तृतीय स्तर", basic: 36673, maxGrade: 2 },
  { id: "province-local-17", category: "province-local", label: "हलुका सवारी चालक - द्वितीय स्तर", basic: 32701, maxGrade: 2 },
  { id: "province-local-18", category: "province-local", label: "हलुका सवारी चालक - प्रथम स्तर", basic: 30373, maxGrade: 2 },

  // कार्यालय सहयोगी
  { id: "province-local-19", category: "province-local", label: "कार्यालय सहयोगी - पाँचौं स्तर", basic: 36142, maxGrade: 4 },
  { id: "province-local-20", category: "province-local", label: "कार्यालय सहयोगी - चतुर्थ स्तर", basic: 32701, maxGrade: 2 },
  { id: "province-local-21", category: "province-local", label: "कार्यालय सहयोगी - तृतीय स्तर", basic: 30373, maxGrade: 2 },
  { id: "province-local-22", category: "province-local", label: "कार्यालय सहयोगी - द्वितीय स्तर", basic: 28690, maxGrade: 2 },
  { id: "province-local-23", category: "province-local", label: "कार्यालय सहयोगी - प्रथम स्तर", basic: 27792, maxGrade: 2 },

  
  // सामुदायिक विद्यालयमा कार्यरत शिक्षक
  // माध्यमिक
  { id: "teacher-1", category: "teacher", label: "माध्यमिक (प्रथम श्रेणी)", basic: 62466, maxGrade: 6 },
  { id: "teacher-2", category: "teacher", label: "माध्यमिक (द्वितीय श्रेणी)", basic: 53611, maxGrade: 5 },
  { id: "teacher-3", category: "teacher", label: "माध्यमिक (तृतीय श्रेणी)", basic: 48085, maxGrade: 5 },

  // निम्न माध्यमिक
  { id: "teacher-4", category: "teacher", label: "निम्न माध्यमिक (प्रथम श्रेणी)", basic: 50485, maxGrade: 5 },
  { id: "teacher-5", category: "teacher", label: "निम्न माध्यमिक (द्वितीय श्रेणी)", basic: 48085, maxGrade: 5 },
  { id: "teacher-6", category: "teacher", label: "निम्न माध्यमिक (तृतीय श्रेणी)", basic: 35203, maxGrade: 5 },

  // प्राथमिक
  { id: "teacher-7", category: "teacher", label: "एस.एल.सी. उत्तीर्ण (प्रथम श्रेणी)", basic: 48085, maxGrade: 5 },
  { id: "teacher-8", category: "teacher", label: "एस.एल.सी. उत्तीर्ण (द्वितीय श्रेणी)", basic: 35203, maxGrade: 5 },
  { id: "teacher-9", category: "teacher", label: "एस.एल.सी. उत्तीर्ण (तृतीय श्रेणी)", basic: 36142, maxGrade: 6 },
  { id: "teacher-10", category: "teacher", label: "दुई विषयसम्म एस.एल.सी. अनुत्तीर्ण", basic: 30373, maxGrade: 6 },
  { id: "teacher-11", category: "teacher", label: "दुई विषयभन्दा बढी एस.एल.सी. अनुत्तीर्ण", basic: 28690, maxGrade: 6 },

 
  // संसद सेवा
  { id: "parliament-1", category: "parliament", label: "विशिष्ट", basic: 79220, maxGrade: 2 },
  { id: "parliament-2", category: "parliament", label: "अतिरिक्त सचिव", basic: 66539, maxGrade: 0 },
  { id: "parliament-3", category: "parliament", label: "प्रथम", basic: 62466, maxGrade: 7 },
  { id: "parliament-4", category: "parliament", label: "द्वितीय", basic: 53611, maxGrade: 5 },
  { id: "parliament-5", category: "parliament", label: "तृतीय", basic: 48085, maxGrade: 5 },

  { id: "parliament-6", category: "parliament", label: "प्रथम अ.मा.", basic: 41517, maxGrade: 0 },
  { id: "parliament-7", category: "parliament", label: "प्रथम", basic: 35203, maxGrade: 10 },
  { id: "parliament-8", category: "parliament", label: "द्वितीय अ.मा.प्रा.", basic: 34707, maxGrade: 0 },
  { id: "parliament-9", category: "parliament", label: "द्वितीय", basic: 36142, maxGrade: 10 },
  { id: "parliament-10", category: "parliament", label: "तृतीय", basic: 30373, maxGrade: 7 },
  { id: "parliament-11", category: "parliament", label: "चतुर्थ", basic: 28690, maxGrade: 6 },

  { id: "parliament-12", category: "parliament", label: "हेभी सवारी चालक - पाँचौं तह", basic: 45777, maxGrade: 4 },
  { id: "parliament-13", category: "parliament", label: "हेभी सवारी चालक - चतुर्थ तह", basic: 43784, maxGrade: 2 },
  { id: "parliament-14", category: "parliament", label: "हेभी सवारी चालक - तृतीय तह", basic: 41321, maxGrade: 2 },
  { id: "parliament-15", category: "parliament", label: "हेभी सवारी चालक - द्वितीय तह", basic: 36673, maxGrade: 2 },
  { id: "parliament-16", category: "parliament", label: "हेभी सवारी चालक - प्रथम तह", basic: 32701, maxGrade: 2 },

  { id: "parliament-17", category: "parliament", label: "हलुका सवारी चालक - पाँचौं तह", basic: 43784, maxGrade: 4 },
  { id: "parliament-18", category: "parliament", label: "हलुका सवारी चालक - चतुर्थ तह", basic: 41321, maxGrade: 2 },
  { id: "parliament-19", category: "parliament", label: "हलुका सवारी चालक - तृतीय तह", basic: 36673, maxGrade: 2 },
  { id: "parliament-20", category: "parliament", label: "हलुका सवारी चालक - द्वितीय तह", basic: 32701, maxGrade: 2 },
  { id: "parliament-21", category: "parliament", label: "हलुका सवारी चालक - प्रथम तह", basic: 30373, maxGrade: 2 },
  // छैठौं तह — खाईपाएको तलबमा एकमुष्ठ थप हुने रु.२५०/-
  { id: "province-local-24", category: "province-local", label: "छैठौं तह - पाँचौं तह", basic: 36142, maxGrade: 4 },
  { id: "province-local-25", category: "province-local", label: "छैठौं तह - चतुर्थ तह", basic: 32701, maxGrade: 2 },
  { id: "province-local-26", category: "province-local", label: "छैठौं तह - तृतीय तह", basic: 30373, maxGrade: 2 },
  { id: "province-local-27", category: "province-local", label: "छैठौं तह - द्वितीय तह", basic: 28690, maxGrade: 2 },
  { id: "province-local-28", category: "province-local", label: "छैठौं तह - प्रथम तह", basic: 27792, maxGrade: 2 },
  

{ id: "province-custom", category: "province", label: "आफ्नो पदको आधारभूत तलब प्रविष्ट गर्नुहोस्", basic: 0, maxGrade: 0 },
{ id: "local-custom", category: "local", label: "आफ्नो पदको आधारभूत तलब प्रविष्ट गर्नुहोस्", basic: 0, maxGrade: 0 },
];

export const employeeCategories = [
  { id: "civil", label: "निजामती सेवा" },
  { id: "police", label: "नेपाल प्रहरी" },
  { id: "army", label: "नेपाली सेना" },
  { id: "apf", label: "सशस्त्र प्रहरी बल, नेपाल" },
  { id: "health", label: "स्वास्थ्य सेवा" },
  { id: "parliament", label: "संसद सेवा" },
  { id: "province-local", label: "प्रदेश तथा स्थानीय तह निवृतिभरण प्रयोजन" },
  { id: "teacher", label: "सामुदायिक विद्यालयमा कार्यरत शिक्षक" },
  { id: "province", label: "प्रदेश सेवा" },
  { id: "local", label: "स्थानीय तह" },
];

export const employeeTypes = [
  { id: "permanent", label: "स्थायी" },
  { id: "temporary", label: "अस्थायी / करार" },
];

export const DEFAULT_FORM = { employeeType: "permanent", category: "civil", level: "ra-pa-third", basicSalary: 48085, gradeNumber: 0, dearnessAllowance: 5000, otherAllowance: 0, citSelfContribution: 0, annualOtherDeduction: 0, taxpayer: "individual" };

const taxSlabs = {
  // The first Rs. 10,00,000 of annual taxable income is social security tax at 1%.
  individual: [[1000000, 0.01], [200000, 0.1], [300000, 0.2], [1000000, 0.3], [Infinity, 0.36]],
  couple: [[1000000, 0.01], [200000, 0.1], [300000, 0.2], [1000000, 0.3], [Infinity, 0.36]],
};

export function calculateAnnualTax(taxableIncome, taxpayer) {
  let remaining = Math.max(0, taxableIncome);
  let tax = 0;
  for (const [band, rate] of taxSlabs[taxpayer]) {
    const taxableInBand = Math.min(remaining, band);
    tax += taxableInBand * rate;
    remaining -= taxableInBand;
    if (remaining <= 0) break;
  }
  return tax;
}
