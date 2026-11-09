(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const ms=[{from:{station:"ward",item:"daily-weight"},to:{station:"weight",item:"how"},label:"住院時每天量體重，回家繼續量"},{from:{station:"admission",item:"symptom"},to:{station:"warning",item:"describe"},label:"入院時練習說出變化，回家打電話也用得上"},{from:{station:"ward",item:"meds-learn"},to:{station:"medication",item:"no-stop"},label:"住院時認識的藥，回家照藥單吃"},{from:{station:"team",item:"pharmacist"},to:{station:"medication",item:"pillbox"},label:"藥師說明，回家整理藥盒"},{from:{station:"team",item:"dietitian"},to:{station:"diet",item:"hidden-salt"},label:"營養師說明，回家餐桌實作"},{from:{station:"team",item:"rehab"},to:{station:"activity",item:"step"},label:"復健評估，回家循序活動"},{from:{station:"team",item:"social"},to:{station:"long-term-care",item:"need"},label:"社工評估，銜接長照資源"},{from:{station:"discharge-prep",item:"caregiver-ready"},to:{station:"long-term-care",item:"carer-rest"},label:"決定主要照顧者，也照顧照顧者"},{from:{station:"discharge",item:"followup-date"},to:{station:"follow-up",item:"bring"},label:"出院單上的回診日期，回診時帶照護卡"},{from:{station:"discharge",item:"contact"},to:{station:"warning",item:"where-help"},label:"出院資料上的聯絡方式，就是求助方式"},{from:{station:"weight",item:"card"},to:{station:"follow-up",item:"phone"},label:"照護卡放電話旁，關懷電話時說清楚"},{from:{station:"palliative",item:"care-goal"},to:{station:"advanced-hf",item:"transplant"},label:"先談在意的事，再一起認識進階治療"}],gl=[{id:"admit-day",title:"入院當天",description:"說出身體變化、帶來平常的藥、認識個案管理師。"},{id:"inpatient",title:"住院期間",description:"每日紀錄、認識藥物、跨團隊說明；也可以開始談照護目標。"},{id:"pre-discharge",title:"出院前",description:"回示教、出院計畫、決定主要照顧者與長照需求。"},{id:"discharge-day",title:"出院當天",description:"看懂出院單、回診日期與聯絡方式，核對藥單。"},{id:"first-week",title:"返家第一週",description:"量體重、按時吃藥、低鹽飲食、留意變化、接關懷電話。"},{id:"long-term",title:"長期照護",description:"規律回診、持續活動、照顧支援與照護目標。"}],hi=i=>`請依筆記本中的院內核定文件，整理心衰竭${i}的執行時點、負責人員、病歷紀錄位置及對應認證條文。請列出來源、版本與頁碼。文件未載明的項目請標示『待確認』。`,wa="多少變化需要聯絡團隊，請依你的個別出院計畫。",xn=[{id:"admission",no:"01",zone:"hospital",title:"入院評估花園",shortName:"入院",subtitle:"入院評估與收案",phases:["admit-day"],entryNodeId:"admission",scene:"醫院入口前是一座花園，右側的小亭子是入院評估亭，旁邊有候診座椅。",roleTips:{patient:"團隊會問你身體的變化。說得越具體，團隊越能幫你。",caregiver:"你平常的觀察很重要。陪同時可以補充病友沒注意到的變化，但先讓病友自己說說看。",staff:"可先請病友完成「說出喘的情況」，再對照規範卡確認入院評估與收案的紀錄位置。"},items:[{id:"symptom",title:"說出喘的情況",summary:"說出在做什麼時不舒服、什麼時候開始、和平常有什麼不同。",keywords:["喘","呼吸","活動","症狀","爬樓梯"],missionId:"admission-describe"},{id:"meds-bring",title:"帶來平常的藥",summary:"把藥袋、保健食品帶來或拍照，讓團隊核對。",keywords:["藥袋","保健食品","過敏","用藥史"]},{id:"first-thing",title:"想先讓團隊知道的事",summary:"睡覺情況、家裡誰照顧、最擔心的事，都可以先說。",keywords:["擔心","睡覺","枕頭","家人"],missionId:"admission-first-thing"},{id:"case-manager",title:"認識個案管理師",summary:"個案管理師會從住院一路陪到出院後，是你和家屬的固定聯絡窗口。",keywords:["個管師","收案","窗口"]}],missions:[{id:"admission-describe",title:"說出喘的情況",interaction:"quiz",scenario:"入院評估時，團隊問：「最近做什麼事時比較容易喘？」",question:"下面哪一種回答，最能讓團隊了解你的狀況？",choices:[{id:"vague",label:"最近都還好，有時候會喘。",feedback:"這句話還沒說到「在做什麼」和「什麼時候開始」。試著加上活動、開始時間，以及跟平常有什麼不同。"},{id:"specific",label:"這兩個禮拜開始，爬到二樓就要停下來喘，以前可以一口氣爬上去。",feedback:"說得很清楚！這句話包含了活動（爬到二樓）、開始時間（這兩個禮拜）和跟平常的差別（以前不用停）。"},{id:"defer",label:"我不知道，你問我太太。",feedback:"家屬的觀察很重要，也可以請家屬補充；不過請先試著用自己的話說：做什麼時不舒服、什麼時候開始。"},{id:"strong",label:"喘得很厲害。",feedback:"「很厲害」別人很難比較。請說說是在做什麼的時候喘，例如走多遠、爬幾層樓、洗澡或穿衣服時。"}],correctChoiceId:"specific",teachBack:{patient:"請用自己的話說一次：「我在做什麼時不舒服，什麼時候開始，和平常有什麼不同。」",caregiver:"請先聽病友說一次，再補充一件你觀察到的變化，例如「他最近洗完澡要坐下來休息比較久」。"}},{id:"admission-first-thing",title:"想先讓團隊知道的事",interaction:"reflection",scenario:"評估快結束時，團隊問：「還有什麼想先讓我們知道的嗎？」",question:"你最想先讓團隊知道哪一件事？（沒有標準答案，不計分）",choices:[{id:"meds",label:"我平常吃的藥和保健食品",feedback:"可以把藥袋或照片給團隊看，讓團隊核對。"},{id:"sleep",label:"晚上睡覺的情況",feedback:"例如要不要墊高枕頭、半夜會不會醒來。這些對團隊很有幫助。"},{id:"home",label:"家裡誰照顧、白天有沒有人陪",feedback:"照顧安排會影響出院準備，早點說，團隊可以早點幫忙規劃。"},{id:"worry",label:"我最擔心的一件事",feedback:"把擔心說出來，團隊才知道要先說明什麼。"}],teachBack:{patient:"請對陪同的家屬或醫療人員說一次：「我想先讓你們知道的是……」",caregiver:"請問病友：「你最想先讓團隊知道什麼？」再用自己的話說一次你聽到的內容。"}}],staff:{topics:["入院評估：症狀、活動耐受度與功能分級紀錄","個案管理收案與照護計畫建立","入院用藥整合（藥物核對）"],query:hi("入院評估與個案管理收案")}},{id:"ward",no:"02",zone:"hospital",title:"住院病房",shortName:"病房",subtitle:"住院期間的照護",phases:["inpatient"],entryNodeId:"ward",scene:"病房大樓前有一條散步廊道，護理站的窗口掛著每日紀錄板。",roleTips:{patient:"住院期間團隊每天看的紀錄，回家後你也要學著自己看。",caregiver:"陪病時可以一起看團隊怎麼量、怎麼記，回家就比較容易接手。",staff:"可藉由住院期間的每日紀錄，提早帶病友與家屬練習居家自我照護。"},items:[{id:"daily-weight",title:"住院每日體重",summary:"住院期間每天量體重，幫團隊了解身體水分的變化。",keywords:["體重","水分","水腫","每日"],missionId:"ward-weight"},{id:"intake-output",title:"進出量紀錄",summary:"團隊可能請你記錄喝了多少、排了多少，請依護理人員說明。",keywords:["尿量","喝水","輸出入","水分"]},{id:"meds-learn",title:"認識調整中的藥",summary:"住院時藥物可能會調整，可以請團隊說明每顆藥的用途。",keywords:["藥物","調藥","利尿劑","心衰竭用藥"]},{id:"rest-move",title:"休息與起身",summary:"依團隊說明逐步增加活動，起身時慢慢來。",keywords:["下床","活動","頭暈","跌倒"]}],missions:[{id:"ward-weight",title:"為什麼每天量體重",interaction:"quiz",scenario:"住院第二天早上，護理師請阿明站上體重計。",question:"住院期間每天量體重，最主要是為了什麼？",choices:[{id:"water",label:"了解身體水分的變化，協助團隊調整治療",feedback:"對！心衰竭時體重的變化常和身體的水分有關，所以每天量。"},{id:"diet",label:"看看有沒有變胖，好決定要不要減肥",feedback:"這裡量體重的重點不是胖瘦，而是看身體水分的變化。再想一想。"},{id:"rule",label:"醫院規定，沒有特別用途",feedback:"量體重有很重要的用途：幫團隊了解身體水分的變化。"}],correctChoiceId:"water",teachBack:{patient:"請說一次：「我每天量體重，是為了看身體水分的變化。」",caregiver:"請說一次量體重的目的，並說出回家後你可以怎麼提醒病友每天量。"}},{id:"ward-ask-med",title:"問清楚調整的藥",interaction:"reflection",scenario:"醫師說今天會調整藥物。",question:"你最想請團隊說明哪一件事？（不計分）",choices:[{id:"why",label:"這顆藥是做什麼用的",feedback:"知道用途，回家比較不會自己停藥。"},{id:"when",label:"什麼時間吃、怎麼吃",feedback:"可以請團隊寫在藥單上，出院時再核對一次。"},{id:"side",label:"吃了可能會有什麼感覺",feedback:"可以請團隊說明哪些感覺要告訴他們。"},{id:"home",label:"回家後要不要繼續吃",feedback:"出院時的藥單會寫清楚，看不懂再問。"}],teachBack:{patient:"請對護理師說：「我想請你說明＿＿這顆藥的＿＿。」",caregiver:"請陪病友一起問一次，並把團隊的說明記在紙上。"}}],staff:{topics:["住院期間每日體重與進出量監測紀錄","藥物治療調整（指引建議用藥）紀錄","住院中衛教起始與紀錄"],query:hi("住院期間監測、藥物治療調整與衛教起始")}},{id:"team",no:"03",zone:"hospital",title:"跨團隊照護站",shortName:"團隊",subtitle:"藥師、營養師、復健與社工",phases:["inpatient","pre-discharge"],entryNodeId:"team",scene:"圓形的團隊會議室外，有藥師、營養師、復健師和社工的四個小窗口。",roleTips:{patient:"很多專業人員會來找你。記下他們是誰、可以問他們什麼。",caregiver:"家屬可以一起參加說明，尤其是飲食、用藥和回家後的照顧安排。",staff:"可用本站確認各專業評估是否啟動，以及團隊討論的紀錄方式。"},items:[{id:"pharmacist",title:"藥師窗口",summary:"說明每顆藥的用途與吃法，協助整理藥單。",keywords:["藥師","藥單","用藥衛教"]},{id:"dietitian",title:"營養師窗口",summary:"依你的情況說明飲食與限鹽方式。",keywords:["營養師","飲食","低鹽","鹽"]},{id:"rehab",title:"復健窗口",summary:"評估活動能力，建議回家後的活動方式。",keywords:["復健","運動","心臟復健","活動"]},{id:"social",title:"社工窗口",summary:"了解家庭照顧安排與可用資源。",keywords:["社工","長照","補助","照顧"]}],missions:[{id:"team-who",title:"這件事要問誰",interaction:"quiz",scenario:"女兒想知道回家後煮菜要注意什麼。",question:"這個問題最適合先問團隊裡的哪一位？",choices:[{id:"dietitian",label:"營養師",feedback:"對！飲食與限鹽的問題可以先問營養師。"},{id:"pharmacist",label:"藥師",feedback:"藥師專長是用藥。煮菜的問題，可以先問負責飲食的營養師。"},{id:"social",label:"社工師",feedback:"社工師協助照顧資源。煮菜的問題，可以先問營養師。"}],correctChoiceId:"dietitian",teachBack:{patient:"請說出你住院期間見過的一位團隊成員，以及你想再問他的一個問題。",caregiver:"請把「飲食問營養師、用藥問藥師、照顧資源問社工」寫在紙上，回家貼在冰箱。"}}],staff:{topics:["跨團隊（醫、護、藥、營養、復健、社工）評估啟動與紀錄","跨團隊討論會議與紀錄","心臟復健評估與轉介"],query:hi("跨團隊評估、團隊會議與心臟復健轉介")}},{id:"discharge-prep",no:"04",zone:"hospital",title:"出院準備中心",shortName:"出院準備",subtitle:"回示教與出院計畫",phases:["pre-discharge"],entryNodeId:"discharge-prep",scene:"中心裡有一面清單牆，桌上放著體重計、藥盒和照護卡，是出院前練習的地方。",roleTips:{patient:"出院前把回家要做的事練習一次，不懂的地方現在就問。",caregiver:"出院後主要照顧的人，最好一起參加練習。",staff:"可對照規範卡確認出院衛教、回示教與出院計畫的紀錄方式。"},items:[{id:"teachback",title:"回示教",summary:"用自己的話說一次、做一次，確認回家真的會做。",keywords:["回示教","衛教","練習"],missionId:"prep-teachback"},{id:"plan",title:"個別出院計畫",summary:"寫給你的照護安排：體重、用藥、回診與何時聯絡團隊。",keywords:["出院計畫","照護計畫","個別"]},{id:"caregiver-ready",title:"主要照顧者",summary:"先決定回家後誰主要照顧，請他一起參加出院前的說明。",keywords:["照顧者","家屬","分工"],missionId:"prep-who"}],missions:[{id:"prep-teachback",title:"回示教的目的",interaction:"quiz",scenario:"護理師說：「請你用自己的話，把回家要量體重的方法說一次給我聽。」",question:"護理師請你說一次，是為了什麼？",choices:[{id:"test",label:"考考我記不記得，答錯會被扣分",feedback:"回示教不是考試，沒有扣分。它是幫團隊確認哪裡說明得還不夠清楚。"},{id:"check",label:"確認我回家真的會做，哪裡不清楚可以馬上補充",feedback:"對！說一次、做一次，團隊就知道哪裡需要再說明。"},{id:"time",label:"打發時間",feedback:"回示教是很重要的出院準備，用來確認回家真的會做。"}],correctChoiceId:"check",teachBack:{patient:"請挑一件回家要做的事，用自己的話說給護理師或家屬聽。",caregiver:"請挑一件回家要做的事，做一次給護理師看，請他告訴你哪裡可以更好。"}},{id:"prep-who",title:"回家後誰主要照顧",interaction:"reflection",scenario:"出院前，團隊想知道回家後的照顧安排。",question:"你們家目前的安排比較像哪一種？（不計分）",choices:[{id:"one",label:"有一位家人主要照顧",feedback:"請這位家人一起參加出院前的說明與練習。"},{id:"share",label:"幾位家人輪流",feedback:"可以約好每個人負責哪些事，一起參加說明。"},{id:"self",label:"大部分自己照顧自己",feedback:"可以和團隊討論，哪些事需要有人幫忙或定期關心。"},{id:"unsure",label:"還沒決定",feedback:"沒關係，可以請社工或個管師一起幫忙想。"}],teachBack:{patient:"請說出：「回家後，＿＿會幫我＿＿。」",caregiver:"請說出你負責的照顧工作，以及需要團隊再教你的一件事。"}}],staff:{topics:["出院準備服務與出院計畫","結構化出院衛教與回示教紀錄","主要照顧者評估與衛教"],query:hi("出院準備服務、出院衛教與回示教")}},{id:"discharge",no:"05",zone:"hospital",title:"出院碼頭",shortName:"出院",subtitle:"看懂出院資料",phases:["discharge-day"],entryNodeId:"discharge",scene:"木頭碼頭旁有一間出院服務小屋，門口擺著行李，告示板上貼著出院文件，橋的另一頭就是居家區。",roleTips:{patient:"出院前，先知道回診日期、有問題找誰，以及你自己的照護計畫。",caregiver:"出院資料常由家屬保管。請陪病友一起找到回診日期和聯絡方式，放在家裡看得到的地方。",staff:"可用虛構出院單帶病友與家屬練習，再對照真實出院資料（不上傳網站）。"},notice:"本網站不需要、也請不要上傳或輸入真實的出院資料。",items:[{id:"followup-date",title:"回診日期",summary:"在出院單上找到回診日期與科別，寫在月曆上。",keywords:["回診","門診","日期","預約"],missionId:"discharge-followup"},{id:"contact",title:"聯絡方式",summary:"有問題時依出院資料上的聯絡方式詢問團隊。",keywords:["電話","聯絡","個管師","求助"],missionId:"discharge-contact"},{id:"my-plan",title:"個別照護計畫",summary:"體重、用藥、何時聯絡團隊，都以這份計畫為準。",keywords:["照護計畫","出院計畫"],missionId:"discharge-plan"}],missions:[{id:"discharge-followup",title:"找出回診日期",interaction:"quiz",scenario:"護理師交給你一張出院單（下方是虛構範例）。",question:"回診日期寫在哪一欄？",prop:{kind:"sheet",title:"模擬出院單",badge:"虛構範例",rows:[{key:"name",label:"姓名",value:"林阿明（虛構）"},{key:"date",label:"出院日期",value:"11 月 10 日"},{key:"followup",label:"回診安排",value:"心臟內科門診　11 月 17 日（星期二）上午"},{key:"contact",label:"有問題時聯絡",value:"心衰竭個案管理師　電話 00-0000-0000（示範號碼）"},{key:"plan",label:"個別照護計畫",value:"每日體重紀錄、藥物清單、何時聯絡團隊——依醫師與個管師說明"}]},choices:[{id:"date",label:"出院日期",feedback:"這是離開醫院的日期，不是回診。再看看哪一欄寫著「門診」。"},{id:"followup",label:"回診安排",feedback:"找到了！回診是 11 月 17 日上午的心臟內科門診。"},{id:"contact",label:"有問題時聯絡",feedback:"這一欄是聯絡方式。回診日期寫在有「門診」字樣的那一欄。"},{id:"plan",label:"個別照護計畫",feedback:"這一欄是照護安排。回診日期寫在有「門診」字樣的那一欄。"}],correctChoiceId:"followup",teachBack:{patient:"請指著出院單說一次：「我下次回診是＿月＿日，看＿＿科。」",caregiver:"請拿出真實的出院資料（不要上傳到網站），指出回診日期，並說說你打算怎麼提醒自己。"}},{id:"discharge-contact",title:"找出聯絡方式",interaction:"quiz",scenario:"回家第二天，你對其中一顆藥有疑問。",question:"出院單上哪一欄告訴你可以聯絡誰？",prop:{kind:"sheet",title:"模擬出院單",badge:"虛構範例",rows:[{key:"followup",label:"回診安排",value:"心臟內科門診　11 月 17 日（星期二）上午"},{key:"contact",label:"有問題時聯絡",value:"心衰竭個案管理師　電話 00-0000-0000（示範號碼）"},{key:"plan",label:"個別照護計畫",value:"每日體重紀錄、藥物清單、何時聯絡團隊——依醫師與個管師說明"}]},choices:[{id:"followup",label:"回診安排",feedback:"回診還要等幾天。有疑問時，找寫著「聯絡」的那一欄。"},{id:"contact",label:"有問題時聯絡",feedback:"對！有問題時，依出院資料上寫的聯絡方式詢問團隊。"},{id:"internet",label:"上網搜尋一個電話",feedback:"網路上的資訊不一定適合你。請用出院資料上「有問題時聯絡」那一欄的方式。"}],correctChoiceId:"contact",teachBack:{patient:"請說一次：「我有問題時，要聯絡＿＿，方式是＿＿。」",caregiver:"請在真實出院資料上找出聯絡方式，存進手機或貼在電話旁，再說一次你會怎麼聯絡。"}},{id:"discharge-plan",title:"找出個別照護計畫",interaction:"quiz",scenario:"每個人的照護計畫不一樣。出院單上有一欄是專門寫給你的。",question:"哪一欄寫的是你個人的照護安排？",choices:[{id:"name",label:"姓名",feedback:"姓名只是確認身分。再找找寫著「計畫」的那一欄。"},{id:"plan",label:"個別照護計畫",feedback:"沒錯！體重怎麼記、藥怎麼吃、什麼時候聯絡團隊，都以這份個別計畫為準。"},{id:"date",label:"出院日期",feedback:"出院日期不是照護安排。再找找寫著「計畫」的那一欄。"}],correctChoiceId:"plan",teachBack:{patient:"請說出你的個別照護計畫裡，你最需要每天做的一件事。",caregiver:"請和病友一起讀一次真實的個別照護計畫，說出家裡誰負責提醒哪一件事。"}}],staff:{topics:["出院醫囑、出院病歷摘要與出院護理摘要","出院帶藥核對與用藥衛教","門診預約與出院計畫交付"],query:hi("出院當日的出院摘要、藥物核對與回診安排")}},{id:"home-care",no:"家",zone:"home",title:"返家照護站",shortName:"返家",subtitle:"回家第一週的自我照護",phases:["discharge-day","first-week"],entryNodeId:"home-care",scene:"心尖的木頭拱門就是回家之門。拱門下的步道通往居家區，兩旁有路燈和花圃，旁邊的小屋是返家照護站。",roleTips:{patient:"回家後，每天量體重是最容易看出身體變化的方法。先讀衛教卡，再做一題情境練習。",caregiver:"陪病友一起讀衛教卡，想想家裡的體重計放在哪裡、紀錄由誰保管。",staff:"可陪病友與家屬一起讀衛教卡，再做情境題，確認他們知道體重變化時要聯絡誰。"},review:"pending",card:{title:"回家第一週：每天量體重",summary:"出院後，體重是最容易看出身體有沒有積水的線索。每天在同樣的時間、用同樣的方式量，才比得出變化。",points:["早上起床、上完廁所、吃早餐前量。","穿差不多的衣服，用同一台體重計。","把數字寫在照護卡或紀錄本上，回診時帶著。","體重比前幾天明顯增加，或是腳腫、變喘，就聯絡照護團隊。"],note:wa},items:[{id:"weigh-daily",title:"每天量體重",summary:"早上起床、上完廁所、吃早餐前，用同一台體重計量，寫在照護卡上。",keywords:["量體重","體重計","返家","回家","出院後"],missionId:"home-care-weight"},{id:"call-team",title:"有變化就聯絡團隊",summary:`體重明顯增加、腳腫或變喘時，打電話給個案管理師或出院資料上的聯絡窗口。${wa}`,keywords:["腳腫","個管師","打電話","聯絡","積水"]}],missions:[{id:"home-care-weight",title:"體重比昨天多了",interaction:"quiz",scenario:"阿明伯出院第三天。今天早上起床、上完廁所後量體重，比昨天多了 1.2 公斤（虛構數字），腳踝也有一點腫，不過還沒有特別喘。",question:"阿明伯現在最適合怎麼做？",choices:[{id:"wait",label:"先不管，明天再量看看就好。",feedback:"體重一天內明顯增加，又有腳踝腫，可能是身體開始積水。等到明天可能更嚴重，今天就要讓照護團隊知道。"},{id:"call",label:"打電話給個案管理師或出院資料上的聯絡窗口，說出體重比昨天多 1.2 公斤、腳踝有點腫。",feedback:"體重短時間上升加上腳腫，是要提早告訴照護團隊的變化。說出具體數字和身體的變化，團隊才能判斷要不要調整藥物或提早回診。"},{id:"pill",label:"自己多吃一顆利尿劑，把水排掉。",feedback:"利尿劑的劑量要由醫師決定。自己加藥可能造成脫水、頭暈或電解質不平衡，請先聯絡照護團隊。"},{id:"water",label:"今天少喝一點水就好，不用跟別人說。",feedback:"少喝水不一定能解決，也可能延誤處理。體重上升和腳腫都要讓照護團隊知道。"}],correctChoiceId:"call",teachBack:{patient:"請用自己的話說一次：「體重比前幾天多、或腳腫變喘時，我會打電話給＿＿＿，說出＿＿＿。」",caregiver:"請說出你看到病友體重增加或腳腫時，會先做什麼、聯絡誰（依出院計畫）。"}}]},{id:"weight",no:"06",zone:"home",title:"體重小屋",shortName:"體重",subtitle:"每日體重紀錄",phases:["first-week","long-term"],entryNodeId:"weight",scene:"過了橋的第一間小屋就是家。門口放著體重計，牆上掛著照護卡。",roleTips:{patient:"量體重是每天幫自己看身體變化的方法。這裡的數字全是模擬練習。",caregiver:"你可以陪病友建立習慣：一起決定量的時間，把照護卡放在體重計旁邊。",staff:"可用模擬照護卡帶練習，再請病友用實體體重計回示教。"},notice:"本站只使用虛構數字，屬於「模擬練習」。請不要在網站輸入真實體重。",items:[{id:"how",title:"量體重三步驟",summary:"量測 → 查看數字 → 寫下紀錄。",keywords:["量體重","步驟","紀錄"],missionId:"weight-sequence"},{id:"same",title:"每天同一個條件",summary:"差不多同一時間、穿差不多的衣服、用同一台體重計。",keywords:["時間","早上","同一台","衣服"],missionId:"weight-consistent"},{id:"card",title:"看懂照護卡",summary:`看出哪一天的數字變化最大。${wa}`,keywords:["照護卡","變化","增加"],missionId:"weight-card"}],missions:[{id:"weight-sequence",title:"排出量體重的順序",interaction:"sequence",scenario:"早上起床後，要在家量體重並記錄。",question:"請依序點選三個步驟。點錯可以按「重新排」。",choices:[{id:"write",label:"寫下紀錄",feedback:"把數字寫到照護卡上。"},{id:"measure",label:"站上體重計量測",feedback:"站穩，等數字停下來。"},{id:"read",label:"查看數字",feedback:"看清楚螢幕上的數字。"}],correctOrder:["measure","read","write"],retryHint:"想一想：要先站上去量，數字出來後看清楚，最後才能寫下來。",teachBack:{patient:"請用實體體重計示範一次，再把數字寫到紙本照護卡上。",caregiver:"請陪病友示範一次，觀察他能不能自己看清楚數字、寫在正確的日期欄。"}},{id:"weight-consistent",title:"讓每天的數字可以比較",interaction:"quiz",scenario:"阿明想知道體重有沒有變化。",question:"下面哪一種做法，最能讓每天的數字互相比較？",choices:[{id:"random",label:"想到的時候再量",feedback:"每天時間不同，數字會受吃飯、喝水影響。試著固定同一個時間。"},{id:"same",label:"每天差不多同一時間、穿差不多的衣服、用同一台體重計",feedback:"對！條件一樣，數字才有比較的意義。"},{id:"switch",label:"家裡兩台體重計輪流用",feedback:"不同體重計可能有差異。請固定用同一台。"}],correctChoiceId:"same",teachBack:{patient:"請說出你打算每天在什麼時間、用哪一台體重計量。",caregiver:"請和病友約好每天量的時間，並說出你會怎麼提醒他。"}},{id:"weight-card",title:"看懂照護卡",interaction:"quiz",scenario:"這是一張模擬照護卡，上面是虛構的三天紀錄。",question:"哪一天的數字和前幾天差最多？",prop:{kind:"sheet",title:"模擬照護卡",badge:"模擬練習",rows:[{key:"d1",label:"第 1 天",value:"62.0 公斤（虛構）"},{key:"d2",label:"第 2 天",value:"62.1 公斤（虛構）"},{key:"d3",label:"第 3 天",value:"63.4 公斤（虛構）"}]},choices:[{id:"d1",label:"第 1 天",feedback:"第 1 天是起點。比一比後面兩天，哪一天跳得最多？"},{id:"d2",label:"第 2 天",feedback:"第 2 天和第 1 天很接近。再看看第 3 天。"},{id:"d3",label:"第 3 天",feedback:"答對了，第 3 天的變化最大。遇到變化時怎麼處理，請依你的個別出院計畫。"}],correctChoiceId:"d3",teachBack:{patient:"請在你的紙本照護卡上指出：如果看到數字變化，你的出院計畫寫著要怎麼做。",caregiver:"請說出你看到照護卡數字變化時，會先做什麼、聯絡誰（依出院計畫）。"}}]},{id:"medication",no:"07",zone:"home",title:"用藥小站",shortName:"用藥",subtitle:"按時吃藥、不自行停藥",phases:["discharge-day","first-week","long-term"],entryNodeId:"medication",scene:"小站的櫃檯上擺著一週分格藥盒、藥袋和一張貼在冰箱上的藥單。",roleTips:{patient:"心衰竭的藥常要長期吃。覺得好多了，也是藥在幫忙。",caregiver:"可以協助整理藥盒、提醒時間，但藥怎麼調整請交給團隊。",staff:"可搭配出院藥單，請病友說出每顆藥的用途與時間。"},items:[{id:"no-stop",title:"不自行停藥",summary:"覺得好轉或有不舒服，都先問團隊，不要自己停藥或改劑量。",keywords:["停藥","減藥","劑量","副作用"],missionId:"med-stop"},{id:"pillbox",title:"整理藥盒",summary:"依藥單把藥分好，放在每天看得到的地方。",keywords:["藥盒","分藥","提醒"]},{id:"missed",title:"忘記吃藥時",summary:"依藥袋或藥師說明處理，不要自己把下一次加倍。",keywords:["忘記","漏吃","補吃"],missionId:"med-missed"},{id:"otc",title:"其他藥與保健食品",summary:"想吃成藥、止痛藥或保健食品前，先問醫師或藥師。",keywords:["成藥","止痛藥","保健食品","中藥"]}],missions:[{id:"med-stop",title:"覺得好多了可以停藥嗎",interaction:"quiz",scenario:"回家兩週，阿明覺得不太喘了，想把其中一顆藥停掉。",question:"比較好的做法是哪一個？",choices:[{id:"stop",label:"既然不喘了，就自己停掉",feedback:"覺得好轉，常是藥物在發揮作用。請不要自己停藥。"},{id:"ask",label:"繼續照藥單吃，回診或打電話時問團隊",feedback:"對！要不要調整藥物，請交給團隊判斷。"},{id:"half",label:"自己改成吃一半",feedback:"自己改劑量也有風險。請照藥單吃，有疑問先問團隊。"}],correctChoiceId:"ask",teachBack:{patient:"請說一次：「我不會自己停藥或改劑量，有疑問會先問團隊。」",caregiver:"請說出你發現病友想停藥時，會怎麼回應、要聯絡誰。"}},{id:"med-missed",title:"忘記吃藥怎麼辦",interaction:"quiz",scenario:"晚上整理藥盒時，發現早上的藥忘了吃。",question:"比較好的做法是哪一個？",choices:[{id:"double",label:"下一次吃兩倍補回來",feedback:"自己加倍可能有風險。請依藥袋或藥師的說明處理。"},{id:"guide",label:"看藥袋說明或問藥師，照說明處理",feedback:"對！每種藥的處理方式不同，依藥袋或藥師說明最安全。"},{id:"ignore",label:"反正一次沒關係，不用理它",feedback:"偶爾忘記也要知道怎麼處理。請看藥袋或問藥師。"}],correctChoiceId:"guide",teachBack:{patient:"請在你的藥袋上找到「忘記服藥」的說明，或寫下要問藥師的問題。",caregiver:"請說出你會用什麼方法提醒病友吃藥（例如藥盒、手機鬧鐘）。"}}]},{id:"diet",no:"08",zone:"home",title:"低鹽餐桌",shortName:"飲食",subtitle:"飲食與限鹽",phases:["first-week","long-term"],entryNodeId:"diet",scene:"廚房小屋外擺著一張餐桌，桌上有新鮮蔬菜、香料，還有一罐被收起來的醬料。",roleTips:{patient:"從一個小改變開始，例如少沾一點醬料。",caregiver:"煮飯的人很關鍵。可以用蔥、薑、蒜、檸檬等增加味道，少用鹽和醬料。",staff:"飲食與水分的個別建議請依醫囑與營養師說明。"},notice:"每個人的限鹽與水分建議不同，請依醫囑與營養師說明。本站不提供個別數字。",items:[{id:"hidden-salt",title:"看不見的鹽",summary:"醃漬物、加工食品、泡麵、醬料常含較多鹽。",keywords:["鹽","鈉","醬油","泡麵","加工食品"],missionId:"diet-salt"},{id:"flavor",title:"用天然香料調味",summary:"蔥、薑、蒜、檸檬、香草可以增加風味，少用鹽。",keywords:["調味","香料","煮菜"]},{id:"eat-out",title:"外食小技巧",summary:"湯少喝、醬料另外放、少選醃漬或加工的菜。",keywords:["外食","便當","湯"]},{id:"fluid",title:"喝水量依醫囑",summary:"要不要限制水分、限多少，請依醫師與營養師說明。",keywords:["喝水","水分","限水"]}],missions:[{id:"diet-salt",title:"哪一餐比較少鹽",interaction:"quiz",scenario:"女兒在想今天晚餐要準備什麼。",question:"下面哪一個選擇通常比較少鹽？",choices:[{id:"noodle",label:"泡麵加一包調味粉",feedback:"泡麵的調味粉通常含很多鹽。再想想新鮮食材自己煮的選項。"},{id:"fresh",label:"新鮮魚肉和青菜，用蔥薑蒜調味",feedback:"對！新鮮食材、用天然香料調味，通常比較少鹽。"},{id:"pickle",label:"白飯配醬菜和肉鬆",feedback:"醬菜和肉鬆屬於醃漬、加工食品，通常含較多鹽。"}],correctChoiceId:"fresh",teachBack:{patient:"請說出你家裡最常吃、可能比較鹹的一樣食物，以及可以怎麼替換。",caregiver:"請說出你下次煮飯時，可以少放鹽、改用哪一種天然香料。"}},{id:"diet-first",title:"先改一個習慣",interaction:"reflection",scenario:"一次改很多很難，先從一件事開始。",question:"你最想先改哪一個習慣？（不計分）",choices:[{id:"sauce",label:"醬料另外放、少沾一點",feedback:"這是很容易開始的一步。"},{id:"soup",label:"湯少喝一點",feedback:"湯裡常有不少鹽，少喝幾口就有幫助。"},{id:"snack",label:"少吃洋芋片、餅乾等零食",feedback:"可以改成新鮮水果或無調味的點心（依醫囑）。"},{id:"outside",label:"外食時選比較清淡的菜",feedback:"可以先從最常吃的那家店開始調整。"}],teachBack:{patient:"請說出：「這一週，我要先試著＿＿。」",caregiver:"請說出你可以怎麼陪病友一起做到這件事。"}}]},{id:"activity",no:"09",zone:"home",title:"活動步道",shortName:"活動",subtitle:"適度活動與休息",phases:["first-week","long-term"],entryNodeId:"activity",scene:"一條繞著小丘的步道，沿路有休息長椅和里程牌。",roleTips:{patient:"活動要循序漸進。覺得累了就休息，量力而為。",caregiver:"可以陪病友散步，留意他說話時喘不喘、要不要停下來休息。",staff:"活動量與心臟復健計畫請依個別評估。"},items:[{id:"step",title:"循序漸進",summary:"依團隊建議，慢慢增加活動，不要一下子做太多。",keywords:["運動","散步","心臟復健"]},{id:"stop-signs",title:"什麼時候要停下來",summary:"比平常更喘、胸悶、頭暈時，先停下來休息。",keywords:["停下","胸悶","頭暈","休息"],missionId:"activity-stop"},{id:"enjoy",title:"想做的活動",summary:"找一件喜歡、做得到的活動，比較容易持續。",keywords:["興趣","持續"],missionId:"activity-want"}],missions:[{id:"activity-stop",title:"散步時不舒服",interaction:"quiz",scenario:"阿明和女兒散步，走到一半覺得比平常更喘，還有點胸悶。",question:"這時候比較好的做法是哪一個？",choices:[{id:"push",label:"咬牙走完，才有運動效果",feedback:"不舒服時硬撐並不安全。請先停下來休息。"},{id:"rest",label:"先停下來坐著休息；若沒有改善，依出院計畫聯絡團隊或求助",feedback:"對！先休息，並依出院計畫判斷要不要聯絡團隊。緊急狀況請撥打 119。"},{id:"faster",label:"加快腳步趕快走回家",feedback:"加快腳步會更吃力。請先停下來休息。"}],correctChoiceId:"rest",teachBack:{patient:"請說出：「活動時我如果＿＿，就會先停下來休息。」",caregiver:"請說出陪散步時你會留意哪些表現，以及需要時要聯絡誰。"}},{id:"activity-want",title:"想做的活動",interaction:"reflection",scenario:"能持續的活動，通常是自己喜歡、做得到的。",question:"你最想慢慢恢復哪一種活動？（不計分）",choices:[{id:"walk",label:"在家附近散步",feedback:"可以和團隊討論適合的距離與時間。"},{id:"garden",label:"種花、做家事",feedback:"可以把工作分段，中間休息。"},{id:"friends",label:"和朋友見面、參加活動",feedback:"社交也很重要，可以安排不趕時間的行程。"},{id:"rehab",label:"參加心臟復健課程",feedback:"可以問團隊是否適合、怎麼轉介。"}],teachBack:{patient:"請說出你想恢復的活動，以及下次想問團隊的一個問題。",caregiver:"請說出你可以怎麼陪伴或協助這項活動。"}}]},{id:"warning",no:"10",zone:"home",title:"警訊燈塔",shortName:"警訊",subtitle:"描述變化與求助",phases:["first-week","long-term"],entryNodeId:"warning",scene:"海角上有一座橘白相間的燈塔，旁邊的看守小屋掛著電話標誌和模擬照護聯絡卡。",roleTips:{patient:"練習把身體的變化說清楚，並找到你出院計畫上寫的求助方式。",caregiver:"家屬常是最先發現變化的人。練習觀察、記下來，並陪病友一起打電話說明。",staff:"本站不含任何門檻數值；正式版的警訊門檻與分流請由院方核定後再填入。"},notice:"本站只練習「描述變化」與「找到求助方式」，不判斷真實病情的嚴重程度。正式版的警訊門檻、聯絡方式與緊急分流由院方核定。若有緊急狀況，請依出院計畫處理或撥打 119。",items:[{id:"describe",title:"說清楚變化",summary:"說出什麼時候開始、和平常差在哪。",keywords:["喘","電話","描述","變化"],missionId:"warning-describe"},{id:"where-help",title:"找到求助方式",summary:"依個別出院計畫和照護聯絡卡上的方式求助。",keywords:["求助","聯絡卡","119","急診"],missionId:"warning-contact"},{id:"observe",title:"家屬觀察分工",summary:"喘、睡覺枕頭數、腳踝腫、體重紀錄，約好誰看哪一項。",keywords:["腳腫","水腫","枕頭","觀察"],missionId:"warning-observe"}],missions:[{id:"warning-describe",title:"在電話中描述變化",interaction:"quiz",scenario:"回家第五天，阿明比平常更喘。家屬也發現他的腳踝變腫了。",question:"打電話給團隊時，哪一種說法最清楚？",choices:[{id:"clear",label:"從前天開始，他走到巷口就要停下來喘，以前可以走到公園；今天早上我看到兩邊腳踝比平常腫。",feedback:"很清楚！說到了何時開始（前天、今天早上）和跟平常差在哪（以前可以走到公園、腳踝比平常腫）。"},{id:"vague",label:"他好像不太舒服。",feedback:"請補充：從什麼時候開始？做什麼時不舒服？和平常差在哪裡？"},{id:"self-judge",label:"應該沒什麼，等下次回診再說。",feedback:"有變化時不要自己判斷，請依出院計畫上的方式聯絡團隊，並把變化說清楚。"},{id:"only-swelling",label:"腳有點腫。",feedback:"有說到腳腫，很好。再加上「什麼時候開始」以及「喘的情況和平常差在哪」。"}],correctChoiceId:"clear",teachBack:{patient:"請和家屬角色扮演一次電話對話：你說出「什麼時候開始、和平常差在哪」。",caregiver:"請扮演打電話的人，說出你觀察到的變化：何時發生、和平常差在哪。再請病友補充。"}},{id:"warning-contact",title:"找到求助方式",interaction:"quiz",scenario:"燈塔小屋裡掛著一張模擬照護聯絡卡（虛構範例）。",question:"要找求助方式，應該依照哪一個？",prop:{kind:"sheet",title:"模擬照護聯絡卡",badge:"虛構範例",rows:[{key:"day",label:"平日白天",value:"依出院計畫上的聯絡方式（示範）"},{key:"night",label:"夜間與假日",value:"依院方說明（正式版由院方填寫）"},{key:"urgent",label:"緊急狀況",value:"依出院計畫指示，或撥打 119"}]},choices:[{id:"plan",label:"我的個別出院計畫和照護聯絡卡上寫的方式",feedback:"對！每個人的求助方式以自己的出院計畫為準。"},{id:"web",label:"網路上找到的號碼",feedback:"網路上的號碼不一定是你的照護團隊。請找出院計畫或聯絡卡上寫的方式。"},{id:"wait",label:"等下次回診再問",feedback:"有變化時不用等到回診。請依出院計畫或聯絡卡上的方式聯絡。"},{id:"neighbor",label:"問鄰居的經驗",feedback:"別人的情況和你不同。請依你的出院計畫或聯絡卡。"}],correctChoiceId:"plan",teachBack:{patient:"請在你真實的出院計畫上指出求助方式（不要上傳到網站），並說一次你會怎麼做。",caregiver:"請在真實出院計畫上找到求助方式，說出白天、夜間各要怎麼聯絡，並把它放在家人都看得到的地方。"}},{id:"warning-observe",title:"家裡的觀察分工",interaction:"reflection",scenario:"每個家庭的作息不同，觀察的方式也不同。",question:"你最想先練習觀察哪一項？（不計分）",choices:[{id:"breath",label:"走路或做事時的喘",feedback:"可以記下「走到哪裡會喘」，下次比較時更清楚。"},{id:"sleep",label:"晚上睡覺的姿勢和枕頭數",feedback:"可以請家人早上問一句：「昨晚睡得好嗎？墊了幾個枕頭？」"},{id:"ankle",label:"腳踝、小腿腫不腫",feedback:"可以留意襪口的痕跡或鞋子是否變緊。"},{id:"card",label:"照護卡上的體重紀錄",feedback:"可以約好每天誰負責看紀錄。"}],teachBack:{patient:"請告訴家人：「我希望你幫我注意的是……」",caregiver:"請說出你每天會在什麼時候、用什麼方式觀察這一項。"}}]},{id:"follow-up",no:"11",zone:"home",title:"回診車站",shortName:"回診",subtitle:"回診與電話追蹤",phases:["first-week","long-term"],entryNodeId:"follow-up",scene:"小車站的月台上有一座大時鐘，候車亭貼著回診月曆，旁邊有一支公共電話。",roleTips:{patient:"回診時把這段時間的照護卡和想問的問題一起帶去。",caregiver:"陪同回診時，可以幫忙記下醫師的說明。",staff:"可對照規範卡確認出院後電話追蹤與回診追蹤的紀錄方式。"},items:[{id:"bring",title:"回診要帶什麼",summary:"健保卡、照護卡、藥袋或藥單，以及寫下的問題。",keywords:["回診","健保卡","藥袋","問題"],missionId:"followup-bring"},{id:"phone",title:"出院後電話關懷",summary:"團隊可能會打電話關心，可以先準備照護卡和想問的事。",keywords:["電話","追蹤","電訪","關懷"],missionId:"followup-phone"},{id:"questions",title:"寫下想問的問題",summary:"平常想到就寫下來，回診時才不會忘記。",keywords:["提問","筆記"]}],missions:[{id:"followup-bring",title:"回診背包",interaction:"quiz",scenario:"明天要回診，女兒正在幫阿明準備。",question:"哪一組最適合帶去回診？",choices:[{id:"full",label:"健保卡、照護卡、藥袋或藥單、寫好的問題",feedback:"對！這些能幫醫師快速了解你回家後的情況。"},{id:"card",label:"只帶健保卡就好",feedback:"健保卡要帶，也別忘了照護卡、藥袋和想問的問題。"},{id:"memory",label:"不用帶，到時候用記的說",feedback:"用記的容易漏掉。請帶照護卡、藥袋和寫好的問題。"}],correctChoiceId:"full",teachBack:{patient:"請準備一張小紙條，寫下下次回診最想問的一個問題。",caregiver:"請說出回診前一天你會幫忙準備哪些東西。"}},{id:"followup-phone",title:"接到關懷電話",interaction:"reflection",scenario:"出院後幾天，個案管理師打電話來關心。",question:"你最想在電話裡先說哪一件事？（不計分）",choices:[{id:"weight",label:"這幾天照護卡上的紀錄",feedback:"把照護卡放在電話旁，說起來比較清楚。"},{id:"meds",label:"吃藥的情況或疑問",feedback:"可以把藥袋拿在手邊。"},{id:"feeling",label:"身體的感覺和變化",feedback:"記得說「什麼時候開始、和平常差在哪」。"},{id:"help",label:"照顧上的困難",feedback:"照顧的困難也可以說，團隊可以幫忙找資源。"}],teachBack:{patient:"請模擬接電話，用三句話說出這幾天的情況。",caregiver:"請模擬接電話，說出你觀察到的情況與照顧上的困難。"}}],staff:{topics:["出院後電話訪視與門診追蹤","出院計畫執行狀況追蹤","品質指標監測（再住院、急診返診）"],query:hi("出院後電話追蹤、門診追蹤與再住院監測")}},{id:"long-term-care",no:"12",zone:"home",title:"長照支援村",shortName:"長照",subtitle:"回家後的照顧支援",phases:["pre-discharge","long-term"],entryNodeId:"long-term-care",scene:"村子裡有附坡道的無障礙住宅、交通接送站，還有一把陽傘下的照顧者休息長椅。",roleTips:{patient:"回家後需要幫忙是很正常的。先想想你最需要哪一項協助。",caregiver:"照顧者也需要被照顧。說出家裡的真實情況，團隊才能幫忙找到適合的資源。",staff:"實際資源與轉介方式由院方提供；可用本站整理家屬的需求優先順序。"},items:[{id:"need",title:"最想先處理的需求",summary:"日常照顧、回診交通、照顧者替手或家中環境。",keywords:["長照","照顧","交通","喘息"],missionId:"ltc-need"},{id:"explain",title:"說明家裡的情況",summary:"誰在家、家裡環境、工作時間與困難。",keywords:["家裡","樓梯","浴室","上班"],missionId:"ltc-explain"},{id:"carer-rest",title:"照顧者也要休息",summary:"照顧者累了也可以說，替手與喘息服務可以詢問團隊。",keywords:["照顧者","喘息","累"]}],missions:[{id:"ltc-need",title:"最想先處理的需求",interaction:"reflection",scenario:"阿明回家後走動需要人扶，女兒白天要上班。",question:"你最想先處理哪一項？（沒有標準答案，不計分）",choices:[{id:"daily",label:"日常照顧（洗澡、移動、吃飯）",feedback:"可以先說明哪些事需要人幫忙、一天大約幾次。"},{id:"transport",label:"回診交通",feedback:"可以先說明回診要去哪裡、家裡有沒有人可以接送。"},{id:"respite",label:"照顧者替手、喘口氣",feedback:"照顧者的休息很重要。可以說明你一週哪些時段最需要人替手。"},{id:"home",label:"家中環境（扶手、浴室、樓梯）",feedback:"可以先拍下家裡的樓梯或浴室，跟團隊討論。"},{id:"unsure",label:"還不確定",feedback:"沒關係。可以先告訴團隊家裡的作息，請他們一起幫忙想。"}],teachBack:{patient:"請說出：「我們最需要的協助是＿＿，想先跟＿＿談。」",caregiver:"請說出：「我們家最需要＿＿，想先跟＿＿談。家裡的情況是……」"}},{id:"ltc-explain",title:"怎麼說明家裡的情況",interaction:"reflection",scenario:"下次和團隊討論時，想把家裡的情況說清楚。",question:"你想先說明哪一件事？（不計分）",choices:[{id:"who",label:"白天、晚上分別誰在家",feedback:"照顧人力的時段，是安排協助時最重要的資訊之一。"},{id:"stairs",label:"家裡的樓梯和浴室",feedback:"可以說明住幾樓、有沒有電梯、浴室有沒有門檻。"},{id:"work",label:"照顧者的工作時間",feedback:"說出上班時段，團隊比較好討論替手的安排。"},{id:"cost",label:"費用或請假的困難",feedback:"這些困難也可以說，團隊或社工可以幫忙想辦法。"}],teachBack:{patient:"請用三句話說明家裡的情況：誰在家、家裡的環境、最需要的幫忙。",caregiver:"請用三句話說明家裡的情況，再問病友：「我這樣說對嗎？有沒有要補充？」"}}]},{id:"palliative",no:"13",zone:"home",title:"安心照護花園",shortName:"安心",subtitle:"安寧緩和與照護目標",phases:["inpatient","long-term"],entryNodeId:"palliative",scene:"安靜的庭院裡有一座涼棚，下面擺著兩張面對面的椅子和一張小桌子，旁邊有一個小水盆。",roleTips:{patient:"這裡沒有對錯。說出你在意的事，讓家人和團隊更了解你。",caregiver:"這一站請多聽少說。聽完後，用自己的話說一次你聽到的，再請病友確認。",staff:"內容用於開啟照護目標對話；住院期間也可從這一站開始。"},items:[{id:"care-goal",title:"我在意的事",summary:"減輕不舒服、和家人相處、希望誰參與討論。",keywords:["安寧","緩和","照護目標","預立醫療"],missionId:"palliative-talk"},{id:"anytime",title:"想法可以改變",summary:"可以分好幾次慢慢談，也可以先說「等我準備好」。",keywords:["ACP","預立","討論"]}],missions:[{id:"palliative-talk",title:"最想談的一件事",interaction:"reflection",scenario:"午後的庭院很安靜，家人陪你坐在涼棚下。",question:"你最想跟家人或團隊談的是哪一件事？（不計分）",choices:[{id:"comfort",label:"減輕不舒服",feedback:"可以說說哪一種不舒服最困擾你，例如喘、睡不好或疲倦。"},{id:"time",label:"保留和家人交談的時間",feedback:"可以說說你希望和誰、多常、在哪裡相處。"},{id:"who",label:"希望誰參與討論",feedback:"可以說說你希望誰一起聽、一起決定。"},{id:"future",label:"想了解接下來可能的變化",feedback:"可以請醫師用你聽得懂的方式說明。"},{id:"not-yet",label:"現在還不想談",feedback:"沒關係。可以先告訴家人「等我準備好再說」。"}],conversationCard:"我想和家人、醫師談的事",teachBack:{patient:"請說出你在意的一件事。接著請家屬用自己的話說一次，最後由你確認：「對，就是這樣。」",caregiver:"請先聽病友說。然後用自己的話回述：「你在意的是……，對嗎？」再請病友確認或修正。"}}],staff:{topics:["家庭會議與醫病共享決策（SDM）","安寧共同照護評估與會診","照護團隊角色分工與家屬支持"],query:hi("照護目標討論、安寧緩和評估與轉介")}},{id:"advanced-hf",no:"14",zone:"home",title:"進階心衰醫療港",shortName:"進階",subtitle:"人工心臟與心臟移植",phases:["inpatient","long-term"],entryNodeId:"advanced-hf",scene:"港邊有兩座展館：藍色的是左心室輔助器（LVAD）館，粉紅色的是心臟移植館，中間有連廊相通。",roleTips:{patient:"先認識，再提問。這裡不需要決定任何事。",caregiver:"進階治療需要家人一起準備。想想你可以分擔哪些照顧工作，以及想問團隊什麼。",staff:"可從住院期間進入；實際裝置操作由團隊用實機教學。"},pickMission:{prompt:"請先選擇要進入的展館："},items:[{id:"lvad",title:"左心室輔助器館",summary:"用示意圖認識控制器、電池與導線。",keywords:["LVAD","人工心臟","左心室輔助器","電池"],missionId:"advanced-lvad"},{id:"transplant",title:"心臟移植館",summary:"評估、等候、術後生活三個階段。",keywords:["移植","心臟移植","等候"],missionId:"advanced-transplant"}],missions:[{id:"advanced-lvad",title:"左心室輔助器（LVAD）館",interaction:"reflection",scenario:"展館牆上有一張示意圖，說明左心室輔助器在身體外面的三個部分。",question:"你最想請團隊實際示範哪一項？（不計分）",prop:{kind:"lvad"},choices:[{id:"controller",label:"控制器：看懂顯示與提示聲",feedback:"可以請團隊用實機示範每一種提示代表的意思。"},{id:"battery",label:"電池：充電與更換",feedback:"可以請團隊示範換電池的步驟，並讓家屬也練習一次。"},{id:"driveline",label:"導線：出口處的照護",feedback:"可以請團隊示範如何保護導線、照顧出口處的皮膚。"},{id:"daily",label:"洗澡、睡覺和外出時怎麼帶著裝置",feedback:"可以請團隊分享日常生活的安排方式。"}],teachBack:{patient:"請說出：你目前對左心室輔助器的理解、家屬需要準備的一件事，以及下次最想問的問題。",caregiver:"請說出：你目前的理解、你可以分擔的一件事，以及下次最想問團隊的問題。"}},{id:"advanced-transplant",title:"心臟移植館",interaction:"reflection",scenario:"展館裡有三張情境卡，說明心臟移植常見的三個階段。",question:"讀完後，你下次最想做哪一件事？（不計分）",prop:{kind:"stages",items:[{title:"評估",text:"團隊會做一系列檢查與會談，了解身體狀況、家庭支持與生活安排。"},{title:"等候",text:"等候期間持續回診、維持身體狀況，並和家人保持聯繫方式暢通。"},{title:"術後生活",text:"需要長期服藥、定期回診與追蹤，家人的陪伴與分工很重要。"}]},choices:[{id:"ask-eval",label:"問團隊：評估包含哪些檢查與會談？",feedback:"把問題寫下來，下次回診帶去。"},{id:"ask-wait",label:"問團隊：等候期間要注意什麼？",feedback:"把問題寫下來，下次回診帶去。"},{id:"ask-after",label:"問團隊：術後生活會有哪些改變？",feedback:"把問題寫下來，下次回診帶去。"},{id:"family",label:"和家屬討論照顧分工",feedback:"可以先列出誰能陪回診、誰能協助用藥提醒。"}],teachBack:{patient:"請說出：你目前對心臟移植的理解、家屬需要準備的一件事，以及下次最想問的問題。",caregiver:"請說出：你目前的理解、家裡可以怎麼分工，以及下次最想問團隊的問題。"}}],staff:{topics:["高危險群病人定義與照護規範","左心室輔助器與心臟移植評估轉介","個管師／移植協調師的辨識、衛教與追蹤"],query:hi("進階心衰竭評估、左心室輔助器與心臟移植轉介及衛教")}}],_o=["admission","ward","team","discharge-prep","discharge","home-care","weight","medication","diet","activity","warning","follow-up","long-term-care","palliative","advanced-hf"];function ed(i,t){const e=[],n=new Set,s=new Set;for(const r of i){const a=`站點 ${r.id}`;_o.includes(r.id)||e.push(`${a}：未知的站點 id`),n.has(r.id)&&e.push(`${a}：站點 id 重複`),n.add(r.id),r.title.trim()||e.push(`${a}：缺少標題`),t&&!t.has(r.entryNodeId)&&e.push(`${a}：entryNodeId「${r.entryNodeId}」不在路網中`),r.missions.length===0&&e.push(`${a}：至少需要一個任務`),r.zone==="hospital"&&!r.staff&&e.push(`${a}：住院區每站都要有醫護人員規範卡`),r.staff&&!r.staff.query.trim()&&e.push(`${a}：缺少醫療人員查詢文字`),(!r.roleTips.patient||!r.roleTips.caregiver||!r.roleTips.staff)&&e.push(`${a}：三種角色都要有進站提示`),(!r.shortName.trim()||r.shortName.length>4)&&e.push(`${a}：shortName 需為 1–4 字`),r.phases.length||e.push(`${a}：至少屬於一個照護階段`);const o=r.items.map(l=>l.id);new Set(o).size!==o.length&&e.push(`${a}：照護重點 id 重複`),(r.items.length<1||r.items.length>4)&&e.push(`${a}：照護重點建議 1–4 項（島上小建築的數量）`),r.card&&((r.missions.length!==1||r.missions[0].interaction!=="quiz")&&e.push(`${a}：有衛教卡的站點只能有一個知識題`),(!r.card.title.trim()||!r.card.summary.trim())&&e.push(`${a}：衛教卡缺少標題或導言`),(r.card.points.length<1||r.card.points.length>5)&&e.push(`${a}：衛教卡重點需 1–5 項`));for(const l of r.items)l.missionId&&!r.missions.some(c=>c.id===l.missionId)&&e.push(`${a}：照護重點 ${l.id} 的 missionId「${l.missionId}」不在本站任務中`);for(const l of r.missions){const c=`${a} / 任務 ${l.id}`;s.has(l.id)&&e.push(`${c}：任務 id 重複`),s.add(l.id),(!l.teachBack.patient?.trim()||!l.teachBack.caregiver?.trim())&&e.push(`${c}：兩種角色都要有示教文字`);const h=l.choices.map(d=>d.id);new Set(h).size!==h.length&&e.push(`${c}：選項 id 重複`),l.choices.length<2&&e.push(`${c}：至少需要兩個選項`);for(const d of l.choices)(!d.label.trim()||!d.feedback.trim())&&e.push(`${c}：選項 ${d.id} 缺少文字或回饋`);const f=l;switch(l.interaction){case"quiz":l.correctChoiceId?h.includes(l.correctChoiceId)||e.push(`${c}：correctChoiceId「${l.correctChoiceId}」不在選項中`):e.push(`${c}：知識題必須有 correctChoiceId`),"correctOrder"in f&&e.push(`${c}：知識題不應有 correctOrder`);break;case"sequence":!Array.isArray(l.correctOrder)||l.correctOrder.length===0?e.push(`${c}：排序題必須有 correctOrder`):(l.correctOrder.length!==h.length||l.correctOrder.some(d=>!h.includes(d)))&&e.push(`${c}：correctOrder 必須剛好包含每個選項一次`),l.retryHint?.trim()||e.push(`${c}：排序題需要 retryHint`),"correctChoiceId"in f&&e.push(`${c}：排序題不應有 correctChoiceId`);break;case"reflection":("correctChoiceId"in f||"correctOrder"in f)&&e.push(`${c}：反思題不可有正確答案`);break;default:e.push(`${c}：未知的 interaction`)}}}for(const r of _o)n.has(r)||e.push(`缺少站點 ${r}`);return e}function nd(i,t,e){const n=[],s=new Map(e.map(a=>[a.id,a]));i.forEach((a,o)=>{for(const l of[a.from,a.to]){const c=s.get(l.station);c?c.items.some(h=>h.id===l.item)||n.push(`串聯線 ${o+1}：${l.station} 沒有照護重點 ${l.item}`):n.push(`串聯線 ${o+1}：未知站點 ${l.station}`)}a.from.station===a.to.station&&n.push(`串聯線 ${o+1}：兩端不可是同一站`)});const r=new Set(t.map(a=>a.id));for(const a of e)for(const o of a.phases)r.has(o)||n.push(`站點 ${a.id}：未知的照護階段 ${o}`);for(const a of t)e.some(o=>o.phases.includes(a.id))||n.push(`照護階段 ${a.id} 沒有任何站點`);return n}const _l="187",id=0,nc=1,sd=2,Vs=1,rd=2,ks=3,Gi=0,on=1,nn=2,fs=0,Ws=1,ic=2,sc=3,rc=4,ad=5,ds=100,od=101,ld=102,cd=103,hd=104,ud=200,dd=201,fd=202,pd=203,Rh=204,Ch=205,md=206,gd=207,_d=208,xd=209,vd=210,yd=211,Sd=212,Md=213,bd=214,xo=0,vo=1,yo=2,Js=3,So=4,Mo=5,bo=6,Eo=7,Ph=0,Ed=1,wd=2,ii=0,Lh=1,Ih=2,Dh=3,Nh=4,Uh=5,Fh=6,Oh=7,Bh=300,gs=301,Zs=302,Ta=303,Aa=304,wo=1e3,ti=1001,To=1002,We=1003,Td=1004,dr=1005,sn=1006,Ra=1007,ei=1008,hn=1009,zh=1010,kh=1011,Ks=1012,xl=1013,Gn=1014,wn=1015,Hn=1016,vl=1017,yl=1018,_s=1020,Gh=35902,Hh=35899,Vh=1021,Wh=1022,zn=1023,Ei=1026,yi=1027,Sl=1028,Ml=1029,Hi=1030,bl=1031,El=1033,qr=33776,$r=33777,Yr=33778,Jr=33779,Ao=35840,Ro=35841,Co=35842,Po=35843,Lo=36196,Io=37492,Do=37496,No=37488,Uo=37489,ea=37490,Fo=37491,Oo=37808,Bo=37809,zo=37810,ko=37811,Go=37812,Ho=37813,Vo=37814,Wo=37815,Xo=37816,qo=37817,$o=37818,Yo=37819,Jo=37820,Zo=37821,Ko=36492,Qo=36494,jo=36495,tl=36283,el=36284,na=36285,nl=36286,Ad=3200,il=0,Rd=1,vi="",Ve="srgb",ia="srgb-linear",sa="linear",me="srgb",Ca=7680,Cd=519,Pd=512,Ld=513,Id=514,Xh=515,Dd=516,Nd=517,qh=518,$h=519,Yh=35044,ac="300 es",Tn=2e3,Qs=2001;function Ud(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ra(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Fd(){const i=ra("canvas");return i.style.display="block",i}const oc={};function aa(...i){const t="THREE."+i.shift();console.log(t,...i)}function Jh(i){const t=i[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=i[1];e&&e.isStackTrace?i[0]+=" "+e.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function kt(...i){i=Jh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...i)}}function oe(...i){i=Jh(i);const t="THREE."+i.shift();{const e=i[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...i)}}function Zr(...i){const t=i.join(" ");t in oc||(oc[t]=!0,kt(...i))}function Od(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Bd={[xo]:xo,[yo]:bo,[So]:So,[Js]:Mo,[vo]:vo,[bo]:yo,[Eo]:Eo,[Mo]:Js};class Xi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const $e=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let lc=1234567;const Xs=Math.PI/180,js=180/Math.PI;function oi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return($e[i&255]+$e[i>>8&255]+$e[i>>16&255]+$e[i>>24&255]+"-"+$e[t&255]+$e[t>>8&255]+"-"+$e[t>>16&15|64]+$e[t>>24&255]+"-"+$e[e&63|128]+$e[e>>8&255]+"-"+$e[e>>16&255]+$e[e>>24&255]+$e[n&255]+$e[n>>8&255]+$e[n>>16&255]+$e[n>>24&255]).toLowerCase()}function te(i,t,e){return Math.max(t,Math.min(e,i))}function wl(i,t){return(i%t+t)%t}function zd(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function kd(i,t,e){return i!==t?(e-i)/(t-i):0}function qs(i,t,e){return(1-e)*i+e*t}function Gd(i,t,e,n){return qs(i,t,1-Math.exp(-e*n))}function Hd(i,t=1){return t-Math.abs(wl(i,t*2)-t)}function Vd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Wd(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Xd(i,t){return i+Math.floor(Math.random()*(t-i+1))}function qd(i,t){return i+Math.random()*(t-i)}function $d(i){return i*(.5-Math.random())}function Yd(i){i!==void 0&&(lc=i);let t=lc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Jd(i){return i*Xs}function Zd(i){return i*js}function Kd(i){return i>0&&Number.isInteger(i)&&2**Math.round(Math.log2(i))===i}function Qd(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Zh(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function jd(i,t,e,n,s){const r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+n)/2),h=a((t+n)/2),f=r((t-n)/2),d=a((t-n)/2),u=r((n-t)/2),p=a((n-t)/2);switch(s){case"XYX":i.set(o*h,l*f,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*f,o*c);break;case"ZXZ":i.set(l*f,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*p,l*u,o*c);break;case"YXY":i.set(l*u,o*h,l*p,o*c);break;case"ZYZ":i.set(l*p,l*u,o*h,o*c);break;default:kt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ma(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Tl(i,t){if(t.constructor===Float32Array)return i;const e=ma(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/e,-1)}function Al(i,t){if(t.constructor===Float32Array)return i;const e=ma(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*e)}const dn={DEG2RAD:Xs,RAD2DEG:js,generateUUID:oi,clamp:te,euclideanModulo:wl,mapLinear:zd,inverseLerp:kd,lerp:qs,damp:Gd,pingpong:Hd,smoothstep:Vd,smootherstep:Wd,randInt:Xd,randFloat:qd,randFloatSpread:$d,seededRandom:Yd,degToRad:Jd,radToDeg:Zd,isPowerOfTwo:Kd,ceilPowerOfTwo:Qd,floorPowerOfTwo:Zh,setQuaternionFromProperEuler:jd,normalize:Al,denormalize:Tl};class lt{static{this.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ms{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],f=n[s+3],d=r[a+0],u=r[a+1],p=r[a+2],y=r[a+3];if(f!==y||l!==d||c!==u||h!==p){let m=l*d+c*u+h*p+f*y;m<0&&(d=-d,u=-u,p=-p,y=-y,m=-m);let g=1-o;if(m<.9995){const v=Math.acos(m),E=Math.sin(v);g=Math.sin(g*v)/E,o=Math.sin(o*v)/E,l=l*g+d*o,c=c*g+u*o,h=h*g+p*o,f=f*g+y*o}else{l=l*g+d*o,c=c*g+u*o,h=h*g+p*o,f=f*g+y*o;const v=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=v,c*=v,h*=v,f*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],f=r[a],d=r[a+1],u=r[a+2],p=r[a+3];return t[e]=o*p+h*f+l*u-c*d,t[e+1]=l*p+h*d+c*f-o*u,t[e+2]=c*p+h*u+o*d-l*f,t[e+3]=h*p-o*f-l*d-c*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),f=o(r/2),d=l(n/2),u=l(s/2),p=l(r/2);switch(a){case"XYZ":this._x=d*h*f+c*u*p,this._y=c*u*f-d*h*p,this._z=c*h*p+d*u*f,this._w=c*h*f-d*u*p;break;case"YXZ":this._x=d*h*f+c*u*p,this._y=c*u*f-d*h*p,this._z=c*h*p-d*u*f,this._w=c*h*f+d*u*p;break;case"ZXY":this._x=d*h*f-c*u*p,this._y=c*u*f+d*h*p,this._z=c*h*p+d*u*f,this._w=c*h*f-d*u*p;break;case"ZYX":this._x=d*h*f-c*u*p,this._y=c*u*f+d*h*p,this._z=c*h*p-d*u*f,this._w=c*h*f+d*u*p;break;case"YZX":this._x=d*h*f+c*u*p,this._y=c*u*f+d*h*p,this._z=c*h*p-d*u*f,this._w=c*h*f-d*u*p;break;case"XZY":this._x=d*h*f-c*u*p,this._y=c*u*f-d*h*p,this._z=c*h*p+d*u*f,this._w=c*h*f+d*u*p;break;default:kt("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],d=n+o+f;if(d>0){const u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(h-l)*u,this._y=(r-c)*u,this._z=(a-s)*u}else if(n>o&&n>f){const u=2*Math.sqrt(1+n-o-f);this._w=(h-l)/u,this._x=.25*u,this._y=(s+a)/u,this._z=(r+c)/u}else if(o>f){const u=2*Math.sqrt(1+o-n-f);this._w=(r-c)/u,this._x=(s+a)/u,this._y=.25*u,this._z=(l+h)/u}else{const u=2*Math.sqrt(1+f-n-o);this._w=(a-s)/u,this._x=(r+c)/u,this._y=(l+h)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{static{this.prototype.isVector3=!0}constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*n),h=2*(o*e-r*s),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=s+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Pa.copy(this).projectOnVector(t),this.sub(Pa)}reflect(t){return this.sub(Pa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pa=new D,cc=new Ms;class Wt{static{this.prototype.isMatrix3=!0}constructor(t,e,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c)}set(t,e,n,s,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],d=n[2],u=n[5],p=n[8],y=s[0],m=s[3],g=s[6],v=s[1],E=s[4],S=s[7],R=s[2],T=s[5],_=s[8];return r[0]=a*y+o*v+l*R,r[3]=a*m+o*E+l*T,r[6]=a*g+o*S+l*_,r[1]=c*y+h*v+f*R,r[4]=c*m+h*E+f*T,r[7]=c*g+h*S+f*_,r[2]=d*y+u*v+p*R,r[5]=d*m+u*E+p*T,r[8]=d*g+u*S+p*_,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,d=o*l-h*r,u=c*r-a*l,p=e*f+n*d+s*u;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/p;return t[0]=f*y,t[1]=(s*c-h*n)*y,t[2]=(o*n-s*a)*y,t[3]=d*y,t[4]=(h*e-s*l)*y,t[5]=(s*r-o*e)*y,t[6]=u*y,t[7]=(n*l-c*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return Zr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(La.makeScale(t,e)),this}rotate(t){return Zr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(La.makeRotation(-t)),this}translate(t,e){return Zr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(La.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const La=new Wt,hc=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),uc=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tf(){const i={enabled:!0,workingColorSpace:ia,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===me&&(s.r=si(s.r),s.g=si(s.g),s.b=si(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===me&&(s.r=ps(s.r),s.g=ps(s.g),s.b=ps(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vi?sa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ia]:{primaries:t,whitePoint:n,transfer:sa,toXYZ:hc,fromXYZ:uc,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ve},outputColorSpaceConfig:{drawingBufferColorSpace:Ve}},[Ve]:{primaries:t,whitePoint:n,transfer:me,toXYZ:hc,fromXYZ:uc,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ve}}}),i}const ae=tf();function si(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ps(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Yi;class ef{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Yi===void 0&&(Yi=ra("canvas")),Yi.width=t.width,Yi.height=t.height;const s=Yi.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Yi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ra("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=si(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(si(e[n]/255)*255):e[n]=si(e[n]);return{data:e,width:t.width,height:t.height}}else return kt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let nf=0;class Rl{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:nf++}),this.uuid=oi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ia(s[a].image)):r.push(Ia(s[a]))}else r=Ia(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ia(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ef.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(kt("Texture: Unable to serialize Texture."),{})}let sf=0;const Da=new D;class Ke extends Xi{constructor(t=Ke.DEFAULT_IMAGE,e=Ke.DEFAULT_MAPPING,n=ti,s=ti,r=sn,a=ei,o=zn,l=hn,c=Ke.DEFAULT_ANISOTROPY,h=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:sf++}),this.uuid=oi(),this.name="",this.source=new Rl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Da).x}get height(){return this.source.getSize(Da).y}get depth(){return this.source.getSize(Da).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){kt(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){kt(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Bh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case wo:t.x=t.x-Math.floor(t.x);break;case ti:t.x=t.x<0?0:1;break;case To:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case wo:t.y=t.y-Math.floor(t.y);break;case ti:t.y=t.y<0?0:1;break;case To:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ke.DEFAULT_IMAGE=null;Ke.DEFAULT_MAPPING=Bh;Ke.DEFAULT_ANISOTROPY=1;class Re{static{this.prototype.isVector4=!0}constructor(t=0,e=0,n=0,s=1){this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const l=t.elements,c=l[0],h=l[4],f=l[8],d=l[1],u=l[5],p=l[9],y=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(f-y)<.01&&Math.abs(p-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(f+y)<.1&&Math.abs(p+m)<.1&&Math.abs(c+u+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(c+1)/2,S=(u+1)/2,R=(g+1)/2,T=(h+d)/4,_=(f+y)/4,b=(p+m)/4;return E>S&&E>R?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=_/n):S>R?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=T/s,r=b/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=_/r,s=b/r),this.set(n,s,r,e),this}let v=Math.sqrt((m-p)*(m-p)+(f-y)*(f-y)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-p)/v,this.y=(f-y)/v,this.z=(d-h)/v,this.w=Math.acos((c+u+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=te(this.x,t.x,e.x),this.y=te(this.y,t.y,e.y),this.z=te(this.z,t.z,e.z),this.w=te(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=te(this.x,t,e),this.y=te(this.y,t,e),this.z=te(this.z,t,e),this.w=te(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(te(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class rf extends Xi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Re(0,0,t,e),this.scissorTest=!1,this.viewport=new Re(0,0,t,e),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new Ke({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:sn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Rl(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kn extends rf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Kh extends Ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class af extends Ke{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=We,this.minFilter=We,this.wrapR=ti,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}class fe{static{this.prototype.isMatrix4=!0}constructor(t,e,n,s,r,a,o,l,c,h,f,d,u,p,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,l,c,h,f,d,u,p,y,m)}set(t,e,n,s,r,a,o,l,c,h,f,d,u,p,y,m){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=f,g[14]=d,g[3]=u,g[7]=p,g[11]=y,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,s=1/Ji.setFromMatrixColumn(t,0).length(),r=1/Ji.setFromMatrixColumn(t,1).length(),a=1/Ji.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const d=a*h,u=a*f,p=o*h,y=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=u+p*c,e[5]=d-y*c,e[9]=-o*l,e[2]=y-d*c,e[6]=p+u*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,u=l*f,p=c*h,y=c*f;e[0]=d+y*o,e[4]=p*o-u,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=u*o-p,e[6]=y+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,u=l*f,p=c*h,y=c*f;e[0]=d-y*o,e[4]=-a*f,e[8]=p+u*o,e[1]=u+p*o,e[5]=a*h,e[9]=y-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,u=a*f,p=o*h,y=o*f;e[0]=l*h,e[4]=p*c-u,e[8]=d*c+y,e[1]=l*f,e[5]=y*c+d,e[9]=u*c-p,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,u=a*c,p=o*l,y=o*c;e[0]=l*h,e[4]=y-d*f,e[8]=p*f+u,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=u*f+p,e[10]=d-y*f}else if(t.order==="XZY"){const d=a*l,u=a*c,p=o*l,y=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=d*f+y,e[5]=a*h,e[9]=u*f-p,e[2]=p*f-u,e[6]=o*h,e[10]=y*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(of,t,lf)}lookAt(t,e,n){const s=this.elements;return ln.subVectors(t,e),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),ui.crossVectors(n,ln),ui.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),ui.crossVectors(n,ln)),ui.normalize(),fr.crossVectors(ln,ui),s[0]=ui.x,s[4]=fr.x,s[8]=ln.x,s[1]=ui.y,s[5]=fr.y,s[9]=ln.y,s[2]=ui.z,s[6]=fr.z,s[10]=ln.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],d=n[9],u=n[13],p=n[2],y=n[6],m=n[10],g=n[14],v=n[3],E=n[7],S=n[11],R=n[15],T=s[0],_=s[4],b=s[8],O=s[12],C=s[1],L=s[5],z=s[9],$=s[13],I=s[2],W=s[6],Z=s[10],G=s[14],rt=s[3],Y=s[7],N=s[11],U=s[15];return r[0]=a*T+o*C+l*I+c*rt,r[4]=a*_+o*L+l*W+c*Y,r[8]=a*b+o*z+l*Z+c*N,r[12]=a*O+o*$+l*G+c*U,r[1]=h*T+f*C+d*I+u*rt,r[5]=h*_+f*L+d*W+u*Y,r[9]=h*b+f*z+d*Z+u*N,r[13]=h*O+f*$+d*G+u*U,r[2]=p*T+y*C+m*I+g*rt,r[6]=p*_+y*L+m*W+g*Y,r[10]=p*b+y*z+m*Z+g*N,r[14]=p*O+y*$+m*G+g*U,r[3]=v*T+E*C+S*I+R*rt,r[7]=v*_+E*L+S*W+R*Y,r[11]=v*b+E*z+S*Z+R*N,r[15]=v*O+E*$+S*G+R*U,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],d=t[10],u=t[14],p=t[3],y=t[7],m=t[11],g=t[15],v=l*u-c*d,E=o*u-c*f,S=o*d-l*f,R=a*u-c*h,T=a*d-l*h,_=a*f-o*h;return e*(y*v-m*E+g*S)-n*(p*v-m*R+g*T)+s*(p*E-y*R+g*_)-r*(p*S-y*T+m*_)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+s*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],d=t[10],u=t[11],p=t[12],y=t[13],m=t[14],g=t[15],v=e*o-n*a,E=e*l-s*a,S=e*c-r*a,R=n*l-s*o,T=n*c-r*o,_=s*c-r*l,b=h*y-f*p,O=h*m-d*p,C=h*g-u*p,L=f*m-d*y,z=f*g-u*y,$=d*g-u*m,I=v*$-E*z+S*L+R*C-T*O+_*b;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const W=1/I;return t[0]=(o*$-l*z+c*L)*W,t[1]=(s*z-n*$-r*L)*W,t[2]=(y*_-m*T+g*R)*W,t[3]=(d*T-f*_-u*R)*W,t[4]=(l*C-a*$-c*O)*W,t[5]=(e*$-s*C+r*O)*W,t[6]=(m*S-p*_-g*E)*W,t[7]=(h*_-d*S+u*E)*W,t[8]=(a*z-o*C+c*b)*W,t[9]=(n*C-e*z-r*b)*W,t[10]=(p*T-y*S+g*v)*W,t[11]=(f*S-h*T-u*v)*W,t[12]=(o*O-a*L-l*b)*W,t[13]=(e*L-n*O+s*b)*W,t[14]=(y*E-p*R-m*v)*W,t[15]=(h*R-f*E+d*v)*W,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,d=r*c,u=r*h,p=r*f,y=a*h,m=a*f,g=o*f,v=l*c,E=l*h,S=l*f,R=n.x,T=n.y,_=n.z;return s[0]=(1-(y+g))*R,s[1]=(u+S)*R,s[2]=(p-E)*R,s[3]=0,s[4]=(u-S)*T,s[5]=(1-(d+g))*T,s[6]=(m+v)*T,s[7]=0,s[8]=(p+E)*_,s[9]=(m-v)*_,s[10]=(1-(d+y))*_,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Ji.set(s[0],s[1],s[2]).length();const o=Ji.set(s[4],s[5],s[6]).length(),l=Ji.set(s[8],s[9],s[10]).length();r<0&&(a=-a),yn.copy(this);const c=1/a,h=1/o,f=1/l;return yn.elements[0]*=c,yn.elements[1]*=c,yn.elements[2]*=c,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=f,yn.elements[9]*=f,yn.elements[10]*=f,e.setFromRotationMatrix(yn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,s,r,a,o=Tn,l=!1){const c=this.elements,h=2*r/(e-t),f=2*r/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s);let p,y;if(l)p=r/(a-r),y=a*r/(a-r);else if(o===Tn)p=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===Qs)p=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Tn,l=!1){const c=this.elements,h=2/(e-t),f=2/(n-s),d=-(e+t)/(e-t),u=-(n+s)/(n-s);let p,y;if(l)p=1/(a-r),y=a/(a-r);else if(o===Tn)p=-2/(a-r),y=-(a+r)/(a-r);else if(o===Qs)p=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=u,c[2]=0,c[6]=0,c[10]=p,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ji=new D,yn=new fe,of=new D(0,0,0),lf=new D(1,1,1),ui=new D,fr=new D,ln=new D,dc=new fe,fc=new Ms;class wi{constructor(t=0,e=0,n=0,s=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],f=s[2],d=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,u),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(te(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-te(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,u));break;case"XZY":this._z=Math.asin(-te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,u),this._y=0);break;default:kt("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return dc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(dc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return fc.setFromEuler(this),this.setFromQuaternion(fc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class Cl{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let cf=0;const pc=new D,Zi=new Ms,$n=new fe,pr=new D,Ts=new D,hf=new D,uf=new Ms,mc=new D(1,0,0),gc=new D(0,1,0),_c=new D(0,0,1),xc={type:"added"},df={type:"removed"},Ki={type:"childadded",child:null},Na={type:"childremoved",child:null};class Ie extends Xi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:cf++}),this.uuid=oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DEFAULT_UP.clone();const t=new D,e=new wi,n=new Ms,s=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new fe},normalMatrix:{value:new Wt}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=Ie.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.multiply(Zi),this}rotateOnWorldAxis(t,e){return Zi.setFromAxisAngle(t,e),this.quaternion.premultiply(Zi),this}rotateX(t){return this.rotateOnAxis(mc,t)}rotateY(t){return this.rotateOnAxis(gc,t)}rotateZ(t){return this.rotateOnAxis(_c,t)}translateOnAxis(t,e){return pc.copy(t).applyQuaternion(this.quaternion),this.position.add(pc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(mc,t)}translateY(t){return this.translateOnAxis(gc,t)}translateZ(t){return this.translateOnAxis(_c,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4($n.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?pr.copy(t):pr.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?$n.lookAt(Ts,pr,this.up):$n.lookAt(pr,Ts,this.up),this.quaternion.setFromRotationMatrix($n),s&&($n.extractRotation(s.matrixWorld),Zi.setFromRotationMatrix($n),this.quaternion.premultiply(Zi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(oe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(xc),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null):oe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(df),Na.child=t,this.dispatchEvent(Na),Na.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),$n.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),$n.multiply(t.parent.matrixWorld)),t.applyMatrix4($n),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(xc),Ki.child=t,this.dispatchEvent(Ki),Ki.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,t,hf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ts,uf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*s,r[13]+=n-r[1]*e-r[5]*n-r[9]*s,r[14]+=s-r[2]*e-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),d=a(t.skeletons),u=a(t.animations),p=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),p.length>0&&(n.nodes=p)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ie.DEFAULT_UP=new D(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class he extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ff={type:"move"};class Ua{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new he,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new he,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new he,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const y of t.hand.values()){const m=e.getJointPose(y,n),g=this._getHandJoint(c,y);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.quaternion,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=h.position.distanceTo(f.position),u=.02,p=.005;c.inputState.pinching&&d>u+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=u-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(ff)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new he;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Qh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},di={h:0,s:0,l:0},mr={h:0,s:0,l:0};function Fa(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ve){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ae.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=ae.workingColorSpace){return this.r=t,this.g=e,this.b=n,ae.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=ae.workingColorSpace){if(t=wl(t,1),e=te(e,0,1),n=te(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Fa(a,r,t+1/3),this.g=Fa(a,r,t),this.b=Fa(a,r,t-1/3)}return ae.colorSpaceToWorking(this,s),this}setStyle(t,e=Ve){function n(r){r!==void 0&&parseFloat(r)<1&&kt("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:kt("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);kt("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ve){const n=Qh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):kt("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=si(t.r),this.g=si(t.g),this.b=si(t.b),this}copyLinearToSRGB(t){return this.r=ps(t.r),this.g=ps(t.g),this.b=ps(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ve){return ae.workingToColorSpace(Ye.copy(this),t),Math.round(te(Ye.r*255,0,255))*65536+Math.round(te(Ye.g*255,0,255))*256+Math.round(te(Ye.b*255,0,255))}getHexString(t=Ve){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ae.workingColorSpace){ae.workingToColorSpace(Ye.copy(this),e);const n=Ye.r,s=Ye.g,r=Ye.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(s-r)/f+(s<r?6:0);break;case s:l=(r-n)/f+2;break;case r:l=(n-s)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=ae.workingColorSpace){return ae.workingToColorSpace(Ye.copy(this),e),t.r=Ye.r,t.g=Ye.g,t.b=Ye.b,t}getStyle(t=Ve){ae.workingToColorSpace(Ye.copy(this),t);const e=Ye.r,n=Ye.g,s=Ye.b;return t!==Ve?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(di),this.setHSL(di.h+t,di.s+e,di.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(di),t.getHSL(mr);const n=qs(di.h,mr.h,e),s=qs(di.s,mr.s,e),r=qs(di.l,mr.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ye=new Kt;Kt.NAMES=Qh;class Pl{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Kt(t),this.near=e,this.far=n}clone(){return new Pl(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class pf extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Sn=new D,Yn=new D,Oa=new D,Jn=new D,Qi=new D,ji=new D,vc=new D,Ba=new D,za=new D,ka=new D,Ga=new Re,Ha=new Re,Va=new Re;class fn{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Sn.subVectors(t,e),s.cross(Sn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Sn.subVectors(s,e),Yn.subVectors(n,e),Oa.subVectors(t,e);const a=Sn.dot(Sn),o=Sn.dot(Yn),l=Sn.dot(Oa),c=Yn.dot(Yn),h=Yn.dot(Oa),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const d=1/f,u=(c*l-o*h)*d,p=(a*h-o*l)*d;return r.set(1-u-p,p,u)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Jn)===null?!1:Jn.x>=0&&Jn.y>=0&&Jn.x+Jn.y<=1}static getInterpolation(t,e,n,s,r,a,o,l){return this.getBarycoord(t,e,n,s,Jn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Jn.x),l.addScaledVector(a,Jn.y),l.addScaledVector(o,Jn.z),l)}static getInterpolatedAttribute(t,e,n,s,r,a){return Ga.setScalar(0),Ha.setScalar(0),Va.setScalar(0),Ga.fromBufferAttribute(t,e),Ha.fromBufferAttribute(t,n),Va.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ga,r.x),a.addScaledVector(Ha,r.y),a.addScaledVector(Va,r.z),a}static isFrontFacing(t,e,n,s){return Sn.subVectors(n,e),Yn.subVectors(t,e),Sn.cross(Yn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Sn.subVectors(this.c,this.b),Yn.subVectors(this.a,this.b),Sn.cross(Yn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return fn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return fn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return fn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return fn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return fn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;Qi.subVectors(s,n),ji.subVectors(r,n),Ba.subVectors(t,n);const l=Qi.dot(Ba),c=ji.dot(Ba);if(l<=0&&c<=0)return e.copy(n);za.subVectors(t,s);const h=Qi.dot(za),f=ji.dot(za);if(h>=0&&f<=h)return e.copy(s);const d=l*f-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(Qi,a);ka.subVectors(t,r);const u=Qi.dot(ka),p=ji.dot(ka);if(p>=0&&u<=p)return e.copy(r);const y=u*c-l*p;if(y<=0&&c>=0&&p<=0)return o=c/(c-p),e.copy(n).addScaledVector(ji,o);const m=h*p-u*f;if(m<=0&&f-h>=0&&u-p>=0)return vc.subVectors(r,s),o=(f-h)/(f-h+(u-p)),e.copy(s).addScaledVector(vc,o);const g=1/(m+y+d);return a=y*g,o=d*g,e.copy(n).addScaledVector(Qi,a).addScaledVector(ji,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class qi{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Mn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Mn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Mn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Mn):Mn.fromBufferAttribute(r,a),Mn.applyMatrix4(t.matrixWorld),this.expandByPoint(Mn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),gr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gr.copy(n.boundingBox)),gr.applyMatrix4(t.matrixWorld),this.union(gr)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Mn),Mn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(As),_r.subVectors(this.max,As),ts.subVectors(t.a,As),es.subVectors(t.b,As),ns.subVectors(t.c,As),fi.subVectors(es,ts),pi.subVectors(ns,es),Ii.subVectors(ts,ns);let e=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Ii.z,Ii.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Ii.z,0,-Ii.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Ii.y,Ii.x,0];return!Wa(e,ts,es,ns,_r)||(e=[1,0,0,0,1,0,0,0,1],!Wa(e,ts,es,ns,_r))?!1:(xr.crossVectors(fi,pi),e=[xr.x,xr.y,xr.z],Wa(e,ts,es,ns,_r))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Mn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Mn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Zn=[new D,new D,new D,new D,new D,new D,new D,new D],Mn=new D,gr=new qi,ts=new D,es=new D,ns=new D,fi=new D,pi=new D,Ii=new D,As=new D,_r=new D,xr=new D,Di=new D;function Wa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Di.fromArray(i,r);const o=s.x*Math.abs(Di.x)+s.y*Math.abs(Di.y)+s.z*Math.abs(Di.z),l=t.dot(Di),c=e.dot(Di),h=n.dot(Di);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Le=new D,vr=new lt;let mf=0;class gn extends Xi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:mf++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Yh,this.updateRanges=[],this.gpuType=wn,this.version=0,this._normalizationScale=t!==void 0?ma(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)vr.fromBufferAttribute(this,e),vr.applyMatrix3(t),this.setXY(e,vr.x,vr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix3(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Tl(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):Al(t,this.array)}}class jh extends gn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class tu extends gn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Yt extends gn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const gf=new qi,Rs=new D,Xa=new D;class bs{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):gf.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Rs.subVectors(t,this.center);const e=Rs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Rs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Xa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Rs.copy(t.center).add(Xa)),this.expandByPoint(Rs.copy(t.center).sub(Xa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let _f=0;const un=new fe,qa=new Ie,is=new D,cn=new qi,Cs=new qi,Be=new D;class Ae extends Xi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_f++}),this.uuid=oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ud(t)?tu:jh)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return un.makeRotationFromQuaternion(t),this.applyMatrix4(un),this}rotateX(t){return un.makeRotationX(t),this.applyMatrix4(un),this}rotateY(t){return un.makeRotationY(t),this.applyMatrix4(un),this}rotateZ(t){return un.makeRotationZ(t),this.applyMatrix4(un),this}translate(t,e,n){return un.makeTranslation(t,e,n),this.applyMatrix4(un),this}scale(t,e,n){return un.makeScale(t,e,n),this.applyMatrix4(un),this}lookAt(t){return qa.lookAt(t),qa.updateMatrix(),this.applyMatrix4(qa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Yt(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&kt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){oe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Be.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Be),Be.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Be)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&oe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){oe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Cs.setFromBufferAttribute(o),this.morphTargetsRelative?(Be.addVectors(cn.min,Cs.min),cn.expandByPoint(Be),Be.addVectors(cn.max,Cs.max),cn.expandByPoint(Be)):(cn.expandByPoint(Cs.min),cn.expandByPoint(Cs.max))}cn.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Be.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Be));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Be.fromBufferAttribute(o,c),l&&(is.fromBufferAttribute(t,c),Be.add(is)),s=Math.max(s,n.distanceToSquared(Be))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&oe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){oe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new gn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(n.count);for(let O=0;O<n.count;O++)o[O]=new D,l[O]=new D;const h=new D,f=new D,d=new D,u=new lt,p=new lt,y=new lt,m=new D,g=new D;function v(O,C,L){c[O]=c[C]=c[L]=1,h.fromBufferAttribute(n,O),f.fromBufferAttribute(n,C),d.fromBufferAttribute(n,L),u.fromBufferAttribute(r,O),p.fromBufferAttribute(r,C),y.fromBufferAttribute(r,L),f.sub(h),d.sub(h),p.sub(u),y.sub(u);const z=1/(p.x*y.y-y.x*p.y);isFinite(z)&&(m.copy(f).multiplyScalar(y.y).addScaledVector(d,-p.y).multiplyScalar(z),g.copy(d).multiplyScalar(p.x).addScaledVector(f,-y.x).multiplyScalar(z),o[O].add(m),o[C].add(m),o[L].add(m),l[O].add(g),l[C].add(g),l[L].add(g))}let E=this.groups;E.length===0&&(E=[{start:0,count:t.count}]);for(let O=0,C=E.length;O<C;++O){const L=E[O],z=L.start,$=L.count;for(let I=z,W=z+$;I<W;I+=3)v(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const S=new D,R=new D,T=new D,_=new D;function b(O){T.fromBufferAttribute(s,O),_.copy(T);const C=o[O];S.copy(C),S.sub(T.multiplyScalar(T.dot(C))).normalize(),R.crossVectors(_,C);const z=R.dot(l[O])<0?-1:1;a.setXYZW(O,S.x,S.y,S.z,z)}for(let O=0,C=n.count;O<C;++O)c[O]&&b(O);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new gn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);const s=new D,r=new D,a=new D,o=new D,l=new D,c=new D,h=new D,f=new D;if(t)for(let d=0,u=t.count;d<u;d+=3){const p=t.getX(d+0),y=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,p),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,m),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),o.fromBufferAttribute(n,p),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,u=e.count;d<u;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),f.subVectors(s,r),h.cross(f),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Be.fromBufferAttribute(t,e),Be.normalize(),t.setXYZ(e,Be.x,Be.y,Be.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,f=o.normalized,d=new c.constructor(l.length*h);let u=0,p=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?u=l[y]*o.data.stride+o.offset:u=l[y]*h;for(let g=0;g<h;g++)d[p++]=c[u++]}return new gn(d,h,f)}if(this.index===null)return kt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ae,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){const d=c[h],u=t(d,n);l.push(u)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,d=c.length;f<d;f++){const u=c[f];h.push(u.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],f=r[c];for(let d=0,u=f.length;d<u;d++)h.push(f[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class xf{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Yh,this.updateRanges=[],this.version=0,this.uuid=oi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=yc(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[e]),s=new this.constructor(n,this.stride);return s.setUsage(this.usage),s}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=yc(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function yc(i){return i.buffer._uuid===void 0&&(i.buffer._uuid=oi()),i.byteOffset===0&&i.byteLength===i.buffer.byteLength?i.buffer._uuid:i.buffer._uuid+":"+i.byteOffset+":"+i.byteLength}const je=new D;class oa{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s,this._normalizationScale=t!==void 0?ma(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){aa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new gn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new oa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){aa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):Tl(t,this.data.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):Al(t,this.data.array)}}const $a=new D,vf=new D,yf=new Wt;class xi{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=$a.subVectors(n,e).cross(vf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const s=t.delta($a),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||yf.getNormalMatrix(t),s=this.coplanarPoint($a).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let Sf=0;class $i extends Xi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sf++}),this.uuid=oi(),this.name="",this.type="Material",this.blending=Ws,this.side=Gi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Rh,this.blendDst=Ch,this.blendEquation=ds,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=Js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ca,this.stencilZFail=Ca,this.stencilZPass=Ca,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){kt(`Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){kt(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Kt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new xi().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new lt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new lt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Ll extends $i{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Kt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let ss;const Ps=new D,rs=new D,as=new D,os=new lt,Ls=new lt,eu=new fe,yr=new D,Is=new D,Sr=new D,Sc=new lt,Ya=new lt,Mc=new lt;class nu extends Ie{constructor(t=new Ll){if(super(),this.isSprite=!0,this.type="Sprite",ss===void 0){ss=new Ae;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new xf(e,5);ss.setIndex([0,1,2,0,2,3]),ss.setAttribute("position",new oa(n,3,0,!1)),ss.setAttribute("uv",new oa(n,2,3,!1))}this.geometry=ss,this.material=t,this.center=new lt(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&oe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),rs.setFromMatrixScale(this.matrixWorld),eu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),as.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&rs.multiplyScalar(-as.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;Mr(yr.set(-.5,-.5,0),as,a,rs,s,r),Mr(Is.set(.5,-.5,0),as,a,rs,s,r),Mr(Sr.set(.5,.5,0),as,a,rs,s,r),Sc.set(0,0),Ya.set(1,0),Mc.set(1,1);let o=t.ray.intersectTriangle(yr,Is,Sr,!1,Ps);if(o===null&&(Mr(Is.set(-.5,.5,0),as,a,rs,s,r),Ya.set(0,1),o=t.ray.intersectTriangle(yr,Sr,Is,!1,Ps),o===null))return;const l=t.ray.origin.distanceTo(Ps);l<t.near||l>t.far||e.push({distance:l,point:Ps.clone(),uv:fn.getInterpolation(Ps,yr,Is,Sr,Sc,Ya,Mc,new lt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){const e=super.toJSON(t);return e.object.center=this.center.toArray(),e}}function Mr(i,t,e,n,s,r){os.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Ls.x=r*os.x-s*os.y,Ls.y=s*os.x+r*os.y):Ls.copy(os),i.copy(t),i.x+=Ls.x,i.y+=Ls.y,i.applyMatrix4(eu)}const Kn=new D,Ja=new D,br=new D,Er=new D;class Il{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Kn.copy(this.origin).addScaledVector(this.direction,e),Kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ja.copy(t).add(e).multiplyScalar(.5),br.copy(e).sub(t).normalize(),Er.copy(this.origin).sub(Ja);const r=t.distanceTo(e)*.5,a=-this.direction.dot(br),o=Er.dot(this.direction),l=-Er.dot(br),c=Er.lengthSq(),h=Math.abs(1-a*a);let f,d,u,p;if(h>0)if(f=a*l-o,d=a*o-l,p=r*h,f>=0)if(d>=-p)if(d<=p){const y=1/h;f*=y,d*=y,u=f*(f+a*d+2*o)+d*(a*f+d+2*l)+c}else d=r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;else d=-r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;else d<=-p?(f=Math.max(0,-(-a*r+o)),d=f>0?-r:Math.min(Math.max(-r,-l),r),u=-f*f+d*(d+2*l)+c):d<=p?(f=0,d=Math.min(Math.max(-r,-l),r),u=d*(d+2*l)+c):(f=Math.max(0,-(a*r+o)),d=f>0?r:Math.min(Math.max(-r,-l),r),u=-f*f+d*(d+2*l)+c);else d=a>0?-r:r,f=Math.max(0,-(a*d+o)),u=-f*f+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(Ja).addScaledVector(br,d),u}intersectSphere(t,e){if(t.radius<0)return null;Kn.subVectors(t.center,this.origin);const n=Kn.dot(this.direction),s=Kn.dot(Kn)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),f>=0?(o=(t.min.z-d.z)*f,l=(t.max.z-d.z)*f):(o=(t.max.z-d.z)*f,l=(t.min.z-d.z)*f),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Kn)!==null}intersectTriangle(t,e,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=t.x-a.x,d=t.y-a.y,u=t.z-a.z,p=e.x-a.x,y=e.y-a.y,m=e.z-a.z,g=n.x-a.x,v=n.y-a.y,E=n.z-a.z,S=Math.abs(l),R=Math.abs(c),T=Math.abs(h);let _,b,O,C,L,z,$,I,W,Z,G,rt;if(S>=R&&S>=T?(O=l,z=f,W=p,rt=g,l>=0?(_=c,b=h,C=d,L=u,$=y,I=m,Z=v,G=E):(_=h,b=c,C=u,L=d,$=m,I=y,Z=E,G=v)):R>=T?(O=c,z=d,W=y,rt=v,c>=0?(_=h,b=l,C=u,L=f,$=m,I=p,Z=E,G=g):(_=l,b=h,C=f,L=u,$=p,I=m,Z=g,G=E)):(O=h,z=u,W=m,rt=E,h>=0?(_=l,b=c,C=f,L=d,$=p,I=y,Z=g,G=v):(_=c,b=l,C=d,L=f,$=y,I=p,Z=v,G=g)),O===0)return null;const Y=_/O,N=b/O,U=1/O,K=C-Y*z,st=L-N*z,k=$-Y*W,et=I-N*W,pt=Z-Y*rt,Dt=G-N*rt,ht=pt*et-Dt*k,Lt=K*Dt-st*pt,Se=k*st-et*K;if(s){if(ht<0||Lt<0||Se<0)return null}else if((ht<0||Lt<0||Se<0)&&(ht>0||Lt>0||Se>0))return null;const zt=ht+Lt+Se;if(zt===0)return null;const Qt=U*(ht*z+Lt*W+Se*rt);return(zt>0?Qt<0:Qt>0)?null:this.at(Qt/zt,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Si extends $i{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=Ph,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const bc=new fe,Ni=new Il,wr=new bs,Ec=new D,Tr=new D,Ar=new D,Rr=new D,Za=new D,Cr=new D,wc=new D,Pr=new D;class qt extends Ie{constructor(t=new Ae,e=new Si){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Cr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],f=r[l];h!==0&&(Za.fromBufferAttribute(f,t),a?Cr.addScaledVector(Za,h):Cr.addScaledVector(Za.sub(e),h))}e.add(Cr)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(r),Ni.copy(t.ray).recast(t.near),!(wr.containsPoint(Ni.origin)===!1&&(Ni.intersectSphere(wr,Ec)===null||Ni.origin.distanceToSquared(Ec)>(t.far-t.near)**2))&&(bc.copy(r).invert(),Ni.copy(t.ray).applyMatrix4(bc),!(n.boundingBox!==null&&Ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ni)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,d=r.groups,u=r.drawRange;if(o!==null)if(Array.isArray(a))for(let p=0,y=d.length;p<y;p++){const m=d[p],g=a[m.materialIndex],v=Math.max(m.start,u.start),E=Math.min(o.count,Math.min(m.start+m.count,u.start+u.count));for(let S=v,R=E;S<R;S+=3){const T=o.getX(S),_=o.getX(S+1),b=o.getX(S+2);s=Lr(this,g,t,n,c,h,f,T,_,b),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,u.start),y=Math.min(o.count,u.start+u.count);for(let m=p,g=y;m<g;m+=3){const v=o.getX(m),E=o.getX(m+1),S=o.getX(m+2);s=Lr(this,a,t,n,c,h,f,v,E,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let p=0,y=d.length;p<y;p++){const m=d[p],g=a[m.materialIndex],v=Math.max(m.start,u.start),E=Math.min(l.count,Math.min(m.start+m.count,u.start+u.count));for(let S=v,R=E;S<R;S+=3){const T=S,_=S+1,b=S+2;s=Lr(this,g,t,n,c,h,f,T,_,b),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,u.start),y=Math.min(l.count,u.start+u.count);for(let m=p,g=y;m<g;m+=3){const v=m,E=m+1,S=m+2;s=Lr(this,a,t,n,c,h,f,v,E,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function Mf(i,t,e,n,s,r,a,o){let l;if(t.side===on?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,t.side===Gi,o),l===null)return null;Pr.copy(o),Pr.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Pr);return c<e.near||c>e.far?null:{distance:c,point:Pr.clone(),object:i}}function Lr(i,t,e,n,s,r,a,o,l,c){i.getVertexPosition(o,Tr),i.getVertexPosition(l,Ar),i.getVertexPosition(c,Rr);const h=Mf(i,t,e,n,Tr,Ar,Rr,wc);if(h){const f=new D;fn.getBarycoord(wc,Tr,Ar,Rr,f),s&&(h.uv=fn.getInterpolatedAttribute(s,o,l,c,f,new lt)),r&&(h.uv1=fn.getInterpolatedAttribute(r,o,l,c,f,new lt)),a&&(h.normal=fn.getInterpolatedAttribute(a,o,l,c,f,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new D,materialIndex:0};fn.getNormal(Tr,Ar,Rr,d.normal),h.face=d,h.barycoord=f}return h}class iu extends Ke{constructor(t=null,e=1,n=1,s,r,a,o,l,c=We,h=We,f,d){super(null,a,o,l,c,h,s,r,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tc extends gn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ls=new fe,Ac=new fe,Ir=[],Rc=new qi,bf=new fe,Ds=new qt,Ns=new bs;class Ef extends qt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Tc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,bf)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new qi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ls),Rc.copy(t.boundingBox).applyMatrix4(ls),this.boundingBox.union(Rc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new bs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ls),Ns.copy(t.boundingSphere).applyMatrix4(ls),this.boundingSphere.union(Ns)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ds.geometry=this.geometry,Ds.material=this.material,Ds.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ns.copy(this.boundingSphere),Ns.applyMatrix4(n),t.ray.intersectsSphere(Ns)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ls),Ac.multiplyMatrices(n,ls),Ds.matrixWorld=Ac,Ds.raycast(t,Ir);for(let a=0,o=Ir.length;a<o;a++){const l=Ir[a];l.instanceId=r,l.object=this,e.push(l)}Ir.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Tc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new iu(new Float32Array(s*this.count),s,this.count,Sl,wn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ui=new bs,wf=new lt(.5,.5),Dr=new D;class tr{constructor(t=new xi,e=new xi,n=new xi,s=new xi,r=new xi,a=new xi){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Tn,n=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],d=r[6],u=r[7],p=r[8],y=r[9],m=r[10],g=r[11],v=r[12],E=r[13],S=r[14],R=r[15];if(s[0].setComponents(c-a,u-h,g-p,R-v).normalize(),s[1].setComponents(c+a,u+h,g+p,R+v).normalize(),s[2].setComponents(c+o,u+f,g+y,R+E).normalize(),s[3].setComponents(c-o,u-f,g-y,R-E).normalize(),n)s[4].setComponents(l,d,m,S).normalize(),s[5].setComponents(c-l,u-d,g-m,R-S).normalize();else if(s[4].setComponents(c-l,u-d,g-m,R-S).normalize(),e===Tn)s[5].setComponents(c+l,u+d,g+m,R+S).normalize();else if(e===Qs)s[5].setComponents(l,d,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ui.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ui.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ui)}intersectsSprite(t){Ui.center.set(0,0,0);const e=wf.distanceTo(t.center);return Ui.radius=.7071067811865476+e,Ui.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ui)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Dr.x=s.normal.x>0?t.max.x:t.min.x,Dr.y=s.normal.y>0?t.max.y:t.min.y,Dr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Dr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Cc=new fe;class Dl{constructor(){this.coordinateSystem=Tn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let s=0;s<e.length;s++){const r=e[s];Cc.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new tr),n[s].setFromProjectionMatrix(Cc,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new tr),e[s].copy(n[s]);return this._count=t._count,this}clone(){return new Dl().copy(this)}}class su extends $i{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const la=new D,ca=new D,Pc=new fe,Us=new Il,Nr=new bs,Ka=new D,Lc=new D;class Tf extends Ie{constructor(t=new Ae,e=new su){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)la.fromBufferAttribute(e,s-1),ca.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=la.distanceTo(ca);t.setAttribute("lineDistance",new Yt(n,1))}else kt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(s),Nr.radius+=r,t.ray.intersectsSphere(Nr)===!1)return;Pc.copy(s).invert(),Us.copy(t.ray).applyMatrix4(Pc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const u=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let y=u,m=p-1;y<m;y+=c){const g=h.getX(y),v=h.getX(y+1),E=Ur(this,t,Us,l,g,v,y);E&&e.push(E)}if(this.isLineLoop){const y=h.getX(p-1),m=h.getX(u),g=Ur(this,t,Us,l,y,m,p-1);g&&e.push(g)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let y=u,m=p-1;y<m;y+=c){const g=Ur(this,t,Us,l,y,y+1,y);g&&e.push(g)}if(this.isLineLoop){const y=Ur(this,t,Us,l,p-1,u,p-1);y&&e.push(y)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Ur(i,t,e,n,s,r,a){const o=i.geometry.attributes.position;if(la.fromBufferAttribute(o,s),ca.fromBufferAttribute(o,r),e.distanceSqToSegment(la,ca,Ka,Lc)>n)return;Ka.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Ka);if(!(c<t.near||c>t.far))return{distance:c,point:Lc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}const Ic=new D,Dc=new D;class Af extends Tf{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Ic.fromBufferAttribute(e,s),Dc.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Ic.distanceTo(Dc);t.setAttribute("lineDistance",new Yt(n,1))}else kt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ru extends Ke{constructor(t=[],e=gs,n,s,r,a,o,l,c,h){super(t,e,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class ga extends Ke{constructor(t,e,n,s,r,a,o,l,c){super(t,e,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class xs extends Ke{constructor(t,e,n=Gn,s,r,a,o=We,l=We,c,h=Ei,f=1){if(h!==Ei&&h!==yi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:f};super(d,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Rl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class au extends xs{constructor(t,e=Gn,n=gs,s,r,a=We,o=We,l,c=Ei){const h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,s,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class ou extends Ke{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Cn extends Ae{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],f=[];let d=0,u=0;p("z","y","x",-1,-1,n,e,t,a,r,0),p("z","y","x",1,-1,n,e,-t,a,r,1),p("x","z","y",1,1,t,n,e,s,a,2),p("x","z","y",1,-1,t,n,-e,s,a,3),p("x","y","z",1,-1,t,e,n,s,r,4),p("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(h,3)),this.setAttribute("uv",new Yt(f,2));function p(y,m,g,v,E,S,R,T,_,b,O){const C=S/_,L=R/b,z=S/2,$=R/2,I=T/2,W=_+1,Z=b+1;let G=0,rt=0;const Y=new D;for(let N=0;N<Z;N++){const U=N*L-$;for(let K=0;K<W;K++){const st=K*C-z;Y[y]=st*v,Y[m]=U*E,Y[g]=I,c.push(Y.x,Y.y,Y.z),Y[y]=0,Y[m]=0,Y[g]=T>0?1:-1,h.push(Y.x,Y.y,Y.z),f.push(K/_),f.push(1-N/b),G+=1}}for(let N=0;N<b;N++)for(let U=0;U<_;U++){const K=d+U+W*N,st=d+U+W*(N+1),k=d+(U+1)+W*(N+1),et=d+(U+1)+W*N;l.push(K,st,et),l.push(st,k,et),rt+=6}o.addGroup(u,rt,O),u+=rt,d+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Cn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class _a extends Ae{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new D,h=new lt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){const u=n+f/e*s;c.x=t*Math.cos(u),c.y=t*Math.sin(u),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Yt(a,3)),this.setAttribute("normal",new Yt(o,3)),this.setAttribute("uv",new Yt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _a(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ai extends Ae{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],f=[],d=[],u=[];let p=0;const y=[],m=n/2;let g=0;v(),a===!1&&(t>0&&E(!0),e>0&&E(!1)),this.setIndex(h),this.setAttribute("position",new Yt(f,3)),this.setAttribute("normal",new Yt(d,3)),this.setAttribute("uv",new Yt(u,2));function v(){const S=new D,R=new D;let T=0;const _=(e-t)/n;for(let b=0;b<=r;b++){const O=[],C=b/r,L=C*(e-t)+t;for(let z=0;z<=s;z++){const $=z/s,I=$*l+o,W=Math.sin(I),Z=Math.cos(I);R.x=L*W,R.y=-C*n+m,R.z=L*Z,f.push(R.x,R.y,R.z),S.set(W,_,Z).normalize(),d.push(S.x,S.y,S.z),u.push($,1-C),O.push(p++)}y.push(O)}for(let b=0;b<s;b++)for(let O=0;O<r;O++){const C=y[O][b],L=y[O+1][b],z=y[O+1][b+1],$=y[O][b+1];(t>0||O!==0)&&(h.push(C,L,$),T+=3),(e>0||O!==r-1)&&(h.push(L,z,$),T+=3)}c.addGroup(g,T,0),g+=T}function E(S){const R=p,T=new lt,_=new D;let b=0;const O=S===!0?t:e,C=S===!0?1:-1;for(let z=1;z<=s;z++)f.push(0,m*C,0),d.push(0,C,0),u.push(.5,.5),p++;const L=p;for(let z=0;z<=s;z++){const I=z/s*l+o,W=Math.cos(I),Z=Math.sin(I);_.x=O*Z,_.y=m*C,_.z=O*W,f.push(_.x,_.y,_.z),d.push(0,C,0),T.x=W*.5+.5,T.y=Z*.5*C+.5,u.push(T.x,T.y),p++}for(let z=0;z<s;z++){const $=R+z,I=L+z;S===!0?h.push(I,I+1,$):h.push(I+1,I,$),b+=3}c.addGroup(g,b,S===!0?1:2),g+=b}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ai(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class An extends ai{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new An(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Nl extends Ae{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new Yt(r,3)),this.setAttribute("normal",new Yt(r.slice(),3)),this.setAttribute("uv",new Yt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){const E=new D,S=new D,R=new D;for(let T=0;T<e.length;T+=3)u(e[T+0],E),u(e[T+1],S),u(e[T+2],R),l(E,S,R,v)}function l(v,E,S,R){const T=R+1,_=[];for(let b=0;b<=T;b++){_[b]=[];const O=v.clone().lerp(S,b/T),C=E.clone().lerp(S,b/T),L=T-b;for(let z=0;z<=L;z++)z===0&&b===T?_[b][z]=O:_[b][z]=O.clone().lerp(C,z/L)}for(let b=0;b<T;b++)for(let O=0;O<2*(T-b)-1;O++){const C=Math.floor(O/2);O%2===0?(d(_[b][C+1]),d(_[b+1][C]),d(_[b][C])):(d(_[b][C+1]),d(_[b+1][C+1]),d(_[b+1][C]))}}function c(v){const E=new D;for(let S=0;S<r.length;S+=3)E.x=r[S+0],E.y=r[S+1],E.z=r[S+2],E.normalize().multiplyScalar(v),r[S+0]=E.x,r[S+1]=E.y,r[S+2]=E.z}function h(){const v=new D;for(let E=0;E<r.length;E+=3){v.x=r[E+0],v.y=r[E+1],v.z=r[E+2];const S=m(v)/2/Math.PI+.5,R=g(v)/Math.PI+.5;a.push(S,1-R)}p(),f()}function f(){for(let v=0;v<a.length;v+=6){const E=a[v+0],S=a[v+2],R=a[v+4],T=Math.max(E,S,R),_=Math.min(E,S,R);T>.9&&_<.1&&(E<.2&&(a[v+0]+=1),S<.2&&(a[v+2]+=1),R<.2&&(a[v+4]+=1))}}function d(v){r.push(v.x,v.y,v.z)}function u(v,E){const S=v*3;E.x=t[S+0],E.y=t[S+1],E.z=t[S+2]}function p(){const v=new D,E=new D,S=new D,R=new D,T=new lt,_=new lt,b=new lt;for(let O=0,C=0;O<r.length;O+=9,C+=6){v.set(r[O+0],r[O+1],r[O+2]),E.set(r[O+3],r[O+4],r[O+5]),S.set(r[O+6],r[O+7],r[O+8]),T.set(a[C+0],a[C+1]),_.set(a[C+2],a[C+3]),b.set(a[C+4],a[C+5]),R.copy(v).add(E).add(S).divideScalar(3);const L=m(R);y(T,C+0,v,L),y(_,C+2,E,L),y(b,C+4,S,L)}}function y(v,E,S,R){R<0&&v.x===1&&(a[E]=v.x-1),S.x===0&&S.z===0&&(a[E]=R/2/Math.PI+.5)}function m(v){return Math.atan2(v.z,-v.x)}function g(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Nl(t.vertices,t.indices,t.radius,t.detail)}}class Wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){kt("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-a,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===a)return s/(r-1);const h=n[s],d=n[s+1]-h,u=(a-h)/d;return(s+u)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),l=e||(a.isVector2?new lt:new D);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new D,s=[],r=[],a=[],o=new D,l=new fe;for(let u=0;u<=t;u++){const p=u/t;s[u]=this.getTangentAt(p,new D)}r[0]=new D,a[0]=new D;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let u=1;u<=t;u++){if(r[u]=r[u-1].clone(),a[u]=a[u-1].clone(),o.crossVectors(s[u-1],s[u]),o.length()>Number.EPSILON){o.normalize();const p=Math.acos(te(s[u-1].dot(s[u]),-1,1));r[u].applyMatrix4(l.makeRotationAxis(o,p))}a[u].crossVectors(s[u],r[u])}if(e===!0){let u=Math.acos(te(r[0].dot(r[t]),-1,1));u/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(u=-u);for(let p=1;p<=t;p++)r[p].applyMatrix4(l.makeRotationAxis(s[p],u*p)),a[p].crossVectors(s[p],r[p])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class Ul extends Wn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new lt){const n=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,u=c-this.aY;l=d*h-u*f+this.aX,c=d*f+u*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Rf extends Ul{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Fl(){let i=0,t=0,e=0,n=0;function s(r,a,o,l){i=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){s(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let d=(a-r)/c-(o-r)/(c+h)+(o-a)/h,u=(o-a)/h-(l-a)/(h+f)+(l-o)/f;d*=h,u*=h,s(a,o,d,u)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Nc=new D,Uc=new D,Qa=new Fl,ja=new Fl,to=new Fl;class Cf extends Wn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new D){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%r]:(Uc.subVectors(s[0],s[1]).add(s[0]),c=Uc);const f=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Nc.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Nc),this.curveType==="centripetal"||this.curveType==="chordal"){const u=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(f),u),y=Math.pow(f.distanceToSquared(d),u),m=Math.pow(d.distanceToSquared(h),u);y<1e-4&&(y=1),p<1e-4&&(p=y),m<1e-4&&(m=y),Qa.initNonuniformCatmullRom(c.x,f.x,d.x,h.x,p,y,m),ja.initNonuniformCatmullRom(c.y,f.y,d.y,h.y,p,y,m),to.initNonuniformCatmullRom(c.z,f.z,d.z,h.z,p,y,m)}else this.curveType==="catmullrom"&&(Qa.initCatmullRom(c.x,f.x,d.x,h.x,this.tension),ja.initCatmullRom(c.y,f.y,d.y,h.y,this.tension),to.initCatmullRom(c.z,f.z,d.z,h.z,this.tension));return n.set(Qa.calc(l),ja.calc(l),to.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new D().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Fc(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,l=i*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*i+e}function Pf(i,t){const e=1-i;return e*e*t}function Lf(i,t){return 2*(1-i)*i*t}function If(i,t){return i*i*t}function $s(i,t,e,n){return Pf(i,t)+Lf(i,e)+If(i,n)}function Df(i,t){const e=1-i;return e*e*e*t}function Nf(i,t){const e=1-i;return 3*e*e*i*t}function Uf(i,t){return 3*(1-i)*i*i*t}function Ff(i,t){return i*i*i*t}function Ys(i,t,e,n,s){return Df(i,t)+Nf(i,e)+Uf(i,n)+Ff(i,s)}class lu extends Wn{constructor(t=new lt,e=new lt,n=new lt,s=new lt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new lt){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ys(t,s.x,r.x,a.x,o.x),Ys(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Of extends Wn{constructor(t=new D,e=new D,n=new D,s=new D){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ys(t,s.x,r.x,a.x,o.x),Ys(t,s.y,r.y,a.y,o.y),Ys(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class cu extends Wn{constructor(t=new lt,e=new lt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new lt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new lt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bf extends Wn{constructor(t=new D,e=new D){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new D){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new D){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hu extends Wn{constructor(t=new lt,e=new lt,n=new lt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new lt){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set($s(t,s.x,r.x,a.x),$s(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ol extends Wn{constructor(t=new D,e=new D,n=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new D){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set($s(t,s.x,r.x,a.x),$s(t,s.y,r.y,a.y),$s(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class uu extends Wn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new lt){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,l=s[a===0?a:a-1],c=s[a],h=s[a>s.length-2?s.length-1:a+1],f=s[a>s.length-3?s.length-1:a+2];return n.set(Fc(o,l.x,c.x,h.x,f.x),Fc(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new lt().fromArray(s))}return this}}var ha=Object.freeze({__proto__:null,ArcCurve:Rf,CatmullRomCurve3:Cf,CubicBezierCurve:lu,CubicBezierCurve3:Of,EllipseCurve:Ul,LineCurve:cu,LineCurve3:Bf,QuadraticBezierCurve:hu,QuadraticBezierCurve3:Ol,SplineCurve:uu});class zf extends Wn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1,this.cacheLengths=null}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ha[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,l=a.getPoints(o);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this.cacheLengths=null,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new ha[s.type]().fromJSON(s))}return this.cacheLengths=null,this}}class Oc extends zf{constructor(t){super(),this.type="Path",this.currentPoint=new lt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new cu(this.currentPoint.clone(),new lt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new hu(this.currentPoint.clone(),new lt(t,e),new lt(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new lu(this.currentPoint.clone(),new lt(t,e),new lt(n,s),new lt(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new uu(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,e+l,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,s,r,a,o,l),this}absellipse(t,e,n,s,r,a,o,l){const c=new Ul(t,e,n,s,r,a,o,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Ti extends Oc{constructor(t){super(t),this.uuid=oi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new Oc().fromJSON(s))}return this}}function kf(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=du(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,l,c;if(n&&(r=Xf(i,t,r,e)),i.length>80*e){o=i[0],l=i[1];let h=o,f=l;for(let d=e;d<s;d+=e){const u=i[d],p=i[d+1];u<o&&(o=u),p<l&&(l=p),u>h&&(h=u),p>f&&(f=p)}c=Math.max(h-o,f-l),c=c!==0?32767/c:0}return er(r,a,e,o,l,c,0),a}function du(i,t,e,n,s){let r;if(s===np(i,t,e,n)>0)for(let a=t;a<e;a+=n)r=Bc(a/n|0,i[a],i[a+1],r);else for(let a=e-n;a>=t;a-=n)r=Bc(a/n|0,i[a],i[a+1],r);return r&&vs(r,r.next)&&(ir(r),r=r.next),r}function Vi(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(vs(e,e.next)||Ee(e.prev,e,e.next)===0)){if(ir(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function er(i,t,e,n,s,r,a){if(!i)return;!a&&r&&Zf(i,n,s,r);let o=i;for(;i.prev!==i.next;){const l=i.prev,c=i.next;if(r?Hf(i,n,s,r):Gf(i)){t.push(l.i,i.i,c.i),ir(i),i=c.next,o=c.next;continue}if(i=c,i===o){a?a===1?(i=Vf(Vi(i),t),er(i,t,e,n,s,r,2)):a===2&&Wf(i,t,e,n,s,r):er(Vi(i),t,e,n,s,r,1);break}}}function Gf(i){const t=i.prev,e=i,n=i.next;if(Ee(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,l=e.y,c=n.y,h=Math.min(s,r,a),f=Math.min(o,l,c),d=Math.max(s,r,a),u=Math.max(o,l,c);let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=d&&p.y>=f&&p.y<=u&&Gs(s,o,r,l,a,c,p.x,p.y)&&Ee(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Hf(i,t,e,n){const s=i.prev,r=i,a=i.next;if(Ee(s,r,a)>=0)return!1;const o=s.x,l=r.x,c=a.x,h=s.y,f=r.y,d=a.y,u=Math.min(o,l,c),p=Math.min(h,f,d),y=Math.max(o,l,c),m=Math.max(h,f,d),g=sl(u,p,t,e,n),v=sl(y,m,t,e,n);let E=i.prevZ,S=i.nextZ;for(;E&&E.z>=g&&S&&S.z<=v;){if(E.x>=u&&E.x<=y&&E.y>=p&&E.y<=m&&E!==s&&E!==a&&Gs(o,h,l,f,c,d,E.x,E.y)&&Ee(E.prev,E,E.next)>=0||(E=E.prevZ,S.x>=u&&S.x<=y&&S.y>=p&&S.y<=m&&S!==s&&S!==a&&Gs(o,h,l,f,c,d,S.x,S.y)&&Ee(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;E&&E.z>=g;){if(E.x>=u&&E.x<=y&&E.y>=p&&E.y<=m&&E!==s&&E!==a&&Gs(o,h,l,f,c,d,E.x,E.y)&&Ee(E.prev,E,E.next)>=0)return!1;E=E.prevZ}for(;S&&S.z<=v;){if(S.x>=u&&S.x<=y&&S.y>=p&&S.y<=m&&S!==s&&S!==a&&Gs(o,h,l,f,c,d,S.x,S.y)&&Ee(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function Vf(i,t){let e=i;do{const n=e.prev,s=e.next.next;!vs(n,s)&&pu(n,e,e.next,s)&&nr(n,s)&&nr(s,n)&&(t.push(n.i,e.i,s.i),ir(e),ir(e.next),e=i=s),e=e.next}while(e!==i);return Vi(e)}function Wf(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&jf(a,o)){let l=mu(a,o);a=Vi(a,a.next),l=Vi(l,l.next),er(a,t,e,n,s,r,0),er(l,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function Xf(i,t,e,n){const s=[];for(let r=0,a=t.length;r<a;r++){const o=t[r]*n,l=r<a-1?t[r+1]*n:i.length,c=du(i,o,l,n,!1);c===c.next&&(c.steiner=!0),s.push(Qf(c))}s.sort(qf);for(let r=0;r<s.length;r++)e=$f(s[r],e);return e}function qf(i,t){let e=i.x-t.x;if(e===0&&(e=i.y-t.y,e===0)){const n=(i.next.y-i.y)/(i.next.x-i.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=n-s}return e}function $f(i,t){const e=Yf(i,t);if(!e)return t;const n=mu(e,i);return Vi(n,n.next),Vi(e,e.next)}function Yf(i,t){let e=t;const n=i.x,s=i.y;let r=-1/0,a;if(vs(i,e))return e;do{if(vs(i,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const f=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=n&&f>r&&(r=f,a=e.x<e.next.x?e:e.next,f===n))return a}e=e.next}while(e!==t);if(!a)return null;const o=a,l=a.x,c=a.y;let h=1/0;e=a;do{if(n>=e.x&&e.x>=l&&n!==e.x&&fu(s<c?n:r,s,l,c,s<c?r:n,s,e.x,e.y)){const f=Math.abs(s-e.y)/(n-e.x);nr(e,i)&&(f<h||f===h&&(e.x>a.x||e.x===a.x&&Jf(a,e)))&&(a=e,h=f)}e=e.next}while(e!==o);return a}function Jf(i,t){return Ee(i.prev,i,t.prev)<0&&Ee(t.next,i,i.next)<0}function Zf(i,t,e,n){let s=i;do s.z===0&&(s.z=sl(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Kf(s)}function Kf(i){let t,e=1;do{let n=i,s;i=null;let r=null;for(t=0;n;){t++;let a=n,o=0;for(let c=0;c<e&&(o++,a=a.nextZ,!!a);c++);let l=e;for(;o>0||l>0&&a;)o!==0&&(l===0||!a||n.z<=a.z)?(s=n,n=n.nextZ,o--):(s=a,a=a.nextZ,l--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;n=a}r.nextZ=null,e*=2}while(t>1);return i}function sl(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function Qf(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function fu(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function Gs(i,t,e,n,s,r,a,o){return!(i===a&&t===o)&&fu(i,t,e,n,s,r,a,o)}function jf(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!tp(i,t)&&(nr(i,t)&&nr(t,i)&&ep(i,t)&&(Ee(i.prev,i,t.prev)||Ee(i,t.prev,t))||vs(i,t)&&Ee(i.prev,i,i.next)>0&&Ee(t.prev,t,t.next)>0)}function Ee(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function vs(i,t){return i.x===t.x&&i.y===t.y}function pu(i,t,e,n){const s=Or(Ee(i,t,e)),r=Or(Ee(i,t,n)),a=Or(Ee(e,n,i)),o=Or(Ee(e,n,t));return!!(s!==r&&a!==o||s===0&&Fr(i,e,t)||r===0&&Fr(i,n,t)||a===0&&Fr(e,i,n)||o===0&&Fr(e,t,n))}function Fr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Or(i){return i>0?1:i<0?-1:0}function tp(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&pu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function nr(i,t){return Ee(i.prev,i,i.next)<0?Ee(i,t,i.next)>=0&&Ee(i,i.prev,t)>=0:Ee(i,t,i.prev)<0||Ee(i,i.next,t)<0}function ep(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function mu(i,t){const e=rl(i.i,i.x,i.y),n=rl(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Bc(i,t,e,n){const s=rl(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ir(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function rl(i,t,e){return{i,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function np(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class ip{static triangulate(t,e,n=2){return kf(t,e,n)}}class ni{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return ni.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];zc(t),kc(n,t);let a=t.length;e.forEach(zc);for(let l=0;l<e.length;l++)s.push(a),a+=e[l].length,kc(n,e[l]);const o=ip.triangulate(n,s);for(let l=0;l<o.length;l+=3)r.push(o.slice(l,l+3));return r}}function zc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function kc(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class sr extends Ae{constructor(t=new Ti([new lt(.5,.5),new lt(-.5,.5),new lt(-.5,-.5),new lt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,l=t.length;o<l;o++){const c=t[o];a(c)}this.setAttribute("position",new Yt(s,3)),this.setAttribute("uv",new Yt(r,2)),this.computeVertexNormals();function a(o){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,u=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:u-.1,y=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const g=e.extrudePath,v=e.UVGenerator!==void 0?e.UVGenerator:sp;let E,S=!1,R,T,_,b;if(g){E=g.getSpacedPoints(h),S=!0,d=!1;const it=g.isCatmullRomCurve3?g.closed:!1;R=g.computeFrenetFrames(h,it),T=new D,_=new D,b=new D}d||(m=0,u=0,p=0,y=0);const O=o.extractPoints(c);let C=O.shape;const L=O.holes;if(!ni.isClockWise(C)){C=C.reverse();for(let it=0,mt=L.length;it<mt;it++){const ut=L[it];ni.isClockWise(ut)&&(L[it]=ut.reverse())}}function $(it){const ut=10000000000000001e-36;let Tt=it[0];for(let Mt=1;Mt<=it.length;Mt++){const Vt=Mt%it.length,Nt=it[Vt],ne=Nt.x-Tt.x,ie=Nt.y-Tt.y,ce=ne*ne+ie*ie,B=Math.max(Math.abs(Nt.x),Math.abs(Nt.y),Math.abs(Tt.x),Math.abs(Tt.y)),Ce=ut*B*B;if(ce<=Ce){it.splice(Vt,1),Mt--;continue}Tt=Nt}}$(C),L.forEach($);const I=L.length,W=C;for(let it=0;it<I;it++){const mt=L[it];C=C.concat(mt)}function Z(it,mt,ut){return mt||oe("ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(mt,ut)}const G=C.length;function rt(it,mt,ut){let Tt,Mt,Vt;const Nt=it.x-mt.x,ne=it.y-mt.y,ie=ut.x-it.x,ce=ut.y-it.y,B=Nt*Nt+ne*ne,Ce=Nt*ce-ne*ie;if(Math.abs(Ce)>Number.EPSILON){const jt=Math.sqrt(B),ge=Math.sqrt(ie*ie+ce*ce),vt=mt.x-ne/jt,we=mt.y+Nt/jt,Bt=ut.x-ce/ge,Gt=ut.y+ie/ge,w=((Bt-vt)*ce-(Gt-we)*ie)/(Nt*ce-ne*ie);Tt=vt+Nt*w-it.x,Mt=we+ne*w-it.y;const x=Tt*Tt+Mt*Mt;if(x<=2)return new lt(Tt,Mt);Vt=Math.sqrt(x/2)}else{let jt=!1;Nt>Number.EPSILON?ie>Number.EPSILON&&(jt=!0):Nt<-Number.EPSILON?ie<-Number.EPSILON&&(jt=!0):Math.sign(ne)===Math.sign(ce)&&(jt=!0),jt?(Tt=-ne,Mt=Nt,Vt=Math.sqrt(B)):(Tt=Nt,Mt=ne,Vt=Math.sqrt(B/2))}return new lt(Tt/Vt,Mt/Vt)}const Y=[];for(let it=0,mt=W.length,ut=mt-1,Tt=it+1;it<mt;it++,ut++,Tt++)ut===mt&&(ut=0),Tt===mt&&(Tt=0),Y[it]=rt(W[it],W[ut],W[Tt]);const N=[];let U,K=Y.concat();for(let it=0,mt=I;it<mt;it++){const ut=L[it];U=[];for(let Tt=0,Mt=ut.length,Vt=Mt-1,Nt=Tt+1;Tt<Mt;Tt++,Vt++,Nt++)Vt===Mt&&(Vt=0),Nt===Mt&&(Nt=0),U[Tt]=rt(ut[Tt],ut[Vt],ut[Nt]);N.push(U),K=K.concat(U)}let st;if(m===0)st=ni.triangulateShape(W,L);else{const it=[],mt=[];for(let ut=0;ut<m;ut++){const Tt=ut/m,Mt=u*Math.cos(Tt*Math.PI/2),Vt=p*Math.sin(Tt*Math.PI/2)+y;for(let Nt=0,ne=W.length;Nt<ne;Nt++){const ie=Z(W[Nt],Y[Nt],Vt);Lt(ie.x,ie.y,-Mt),Tt===0&&it.push(ie)}for(let Nt=0,ne=I;Nt<ne;Nt++){const ie=L[Nt];U=N[Nt];const ce=[];for(let B=0,Ce=ie.length;B<Ce;B++){const jt=Z(ie[B],U[B],Vt);Lt(jt.x,jt.y,-Mt),Tt===0&&ce.push(jt)}Tt===0&&mt.push(ce)}}st=ni.triangulateShape(it,mt)}const k=st.length,et=p+y;for(let it=0;it<G;it++){const mt=d?Z(C[it],K[it],et):C[it];S?(_.copy(R.normals[0]).multiplyScalar(mt.x),T.copy(R.binormals[0]).multiplyScalar(mt.y),b.copy(E[0]).add(_).add(T),Lt(b.x,b.y,b.z)):Lt(mt.x,mt.y,0)}for(let it=1;it<=h;it++)for(let mt=0;mt<G;mt++){const ut=d?Z(C[mt],K[mt],et):C[mt];S?(_.copy(R.normals[it]).multiplyScalar(ut.x),T.copy(R.binormals[it]).multiplyScalar(ut.y),b.copy(E[it]).add(_).add(T),Lt(b.x,b.y,b.z)):Lt(ut.x,ut.y,f/h*it)}for(let it=m-1;it>=0;it--){const mt=it/m,ut=u*Math.cos(mt*Math.PI/2),Tt=p*Math.sin(mt*Math.PI/2)+y;for(let Mt=0,Vt=W.length;Mt<Vt;Mt++){const Nt=Z(W[Mt],Y[Mt],Tt);Lt(Nt.x,Nt.y,f+ut)}for(let Mt=0,Vt=L.length;Mt<Vt;Mt++){const Nt=L[Mt];U=N[Mt];for(let ne=0,ie=Nt.length;ne<ie;ne++){const ce=Z(Nt[ne],U[ne],Tt);S?Lt(ce.x,ce.y+E[h-1].y,E[h-1].x+ut):Lt(ce.x,ce.y,f+ut)}}}pt(),Dt();function pt(){const it=s.length/3;if(d){let mt=0,ut=G*mt;for(let Tt=0;Tt<k;Tt++){const Mt=st[Tt];Se(Mt[2]+ut,Mt[1]+ut,Mt[0]+ut)}mt=h+m*2,ut=G*mt;for(let Tt=0;Tt<k;Tt++){const Mt=st[Tt];Se(Mt[0]+ut,Mt[1]+ut,Mt[2]+ut)}}else{for(let mt=0;mt<k;mt++){const ut=st[mt];Se(ut[2],ut[1],ut[0])}for(let mt=0;mt<k;mt++){const ut=st[mt];Se(ut[0]+G*h,ut[1]+G*h,ut[2]+G*h)}}n.addGroup(it,s.length/3-it,0)}function Dt(){const it=s.length/3;let mt=0;ht(W,mt),mt+=W.length;for(let ut=0,Tt=L.length;ut<Tt;ut++){const Mt=L[ut];ht(Mt,mt),mt+=Mt.length}n.addGroup(it,s.length/3-it,1)}function ht(it,mt){let ut=it.length;for(;--ut>=0;){const Tt=ut;let Mt=ut-1;Mt<0&&(Mt=it.length-1);for(let Vt=0,Nt=h+m*2;Vt<Nt;Vt++){const ne=G*Vt,ie=G*(Vt+1),ce=mt+Tt+ne,B=mt+Mt+ne,Ce=mt+Mt+ie,jt=mt+Tt+ie;zt(ce,B,Ce,jt)}}}function Lt(it,mt,ut){l.push(it),l.push(mt),l.push(ut)}function Se(it,mt,ut){Qt(it),Qt(mt),Qt(ut);const Tt=s.length/3,Mt=v.generateTopUV(n,s,Tt-3,Tt-2,Tt-1);ee(Mt[0]),ee(Mt[1]),ee(Mt[2])}function zt(it,mt,ut,Tt){Qt(it),Qt(mt),Qt(Tt),Qt(mt),Qt(ut),Qt(Tt);const Mt=s.length/3,Vt=v.generateSideWallUV(n,s,Mt-6,Mt-3,Mt-2,Mt-1);ee(Vt[0]),ee(Vt[1]),ee(Vt[3]),ee(Vt[1]),ee(Vt[2]),ee(Vt[3])}function Qt(it){s.push(l[it*3+0]),s.push(l[it*3+1]),s.push(l[it*3+2])}function ee(it){r.push(it.x),r.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return rp(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ha[s.type]().fromJSON(s)),new sr(n,t.options)}}const sp={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],l=t[n*3+1],c=t[s*3],h=t[s*3+1];return[new lt(r,a),new lt(o,l),new lt(c,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],f=t[n*3+2],d=t[s*3],u=t[s*3+1],p=t[s*3+2],y=t[r*3],m=t[r*3+1],g=t[r*3+2];return Math.abs(o-h)<Math.abs(a-c)?[new lt(a,1-l),new lt(c,1-f),new lt(d,1-p),new lt(y,1-g)]:[new lt(o,1-l),new lt(h,1-f),new lt(u,1-p),new lt(m,1-g)]}};function rp(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class en extends Nl{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new en(t.radius,t.detail)}}class Ri extends Ae{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,f=t/o,d=e/l,u=[],p=[],y=[],m=[];for(let g=0;g<h;g++){const v=g*d-a;for(let E=0;E<c;E++){const S=E*f-r;p.push(S,-v,0),y.push(0,0,1),m.push(E/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let v=0;v<o;v++){const E=v+c*g,S=v+c*(g+1),R=v+1+c*(g+1),T=v+1+c*g;u.push(E,S,T),u.push(S,R,T)}this.setIndex(u),this.setAttribute("position",new Yt(p,3)),this.setAttribute("normal",new Yt(y,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ri(t.width,t.height,t.widthSegments,t.heightSegments)}}class xa extends Ae{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let f=t;const d=(e-t)/s,u=new D,p=new lt;for(let y=0;y<=s;y++){for(let m=0;m<=n;m++){const g=r+m/n*a;u.x=f*Math.cos(g),u.y=f*Math.sin(g),l.push(u.x,u.y,u.z),c.push(0,0,1),p.x=(u.x/e+1)/2,p.y=(u.y/e+1)/2,h.push(p.x,p.y)}f+=d}for(let y=0;y<s;y++){const m=y*(n+1);for(let g=0;g<n;g++){const v=g+m,E=v,S=v+n+1,R=v+n+2,T=v+1;o.push(E,S,T),o.push(S,R,T)}}this.setIndex(o),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(c,3)),this.setAttribute("uv",new Yt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xa(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class rr extends Ae{constructor(t=new Ti([new lt(0,.5),new lt(-.5,-.5),new lt(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],a=[];let o=0,l=0;if(Array.isArray(t)===!1)c(t);else for(let h=0;h<t.length;h++)c(t[h]),this.addGroup(o,l,h),o+=l,l=0;this.setIndex(n),this.setAttribute("position",new Yt(s,3)),this.setAttribute("normal",new Yt(r,3)),this.setAttribute("uv",new Yt(a,2));function c(h){const f=s.length/3,d=h.extractPoints(e);let u=d.shape;const p=d.holes;ni.isClockWise(u)===!1&&(u=u.reverse());for(let m=0,g=p.length;m<g;m++){const v=p[m];ni.isClockWise(v)===!0&&(p[m]=v.reverse())}const y=ni.triangulateShape(u,p);for(let m=0,g=p.length;m<g;m++){const v=p[m];u=u.concat(v)}for(let m=0,g=u.length;m<g;m++){const v=u[m];s.push(v.x,v.y,0),r.push(0,0,1),a.push(v.x,v.y)}for(let m=0,g=y.length;m<g;m++){const v=y[m],E=v[0]+f,S=v[1]+f,R=v[2]+f;n.push(E,S,R),l+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return ap(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const a=e[t.shapes[s]];n.push(a)}return new rr(n,t.curveSegments)}}function ap(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class Bl extends Ae{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new D,d=new D,u=[],p=[],y=[],m=[];for(let g=0;g<=n;g++){const v=[],E=g/n,S=a+E*o,R=t*Math.cos(S),T=Math.sqrt(t*t-R*R);let _=0;g===0&&a===0?_=.5/e:g===n&&l===Math.PI&&(_=-.5/e);for(let b=0;b<=e;b++){const O=b/e,C=s+O*r;f.x=-T*Math.cos(C),f.y=R,f.z=T*Math.sin(C),p.push(f.x,f.y,f.z),d.copy(f).normalize(),y.push(d.x,d.y,d.z),m.push(O+_,1-E),v.push(c++)}h.push(v)}for(let g=0;g<n;g++)for(let v=0;v<e;v++){const E=h[g][v+1],S=h[g][v],R=h[g+1][v],T=h[g+1][v+1];(g!==0||a>0)&&u.push(E,S,T),(g!==n-1||l<Math.PI)&&u.push(S,R,T)}this.setIndex(u),this.setAttribute("position",new Yt(p,3)),this.setAttribute("normal",new Yt(y,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ua extends Ae{constructor(t=new Ol(new D(-1,-1,0),new D(-1,1,0),new D(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new D,l=new D,c=new lt;let h=new D;const f=[],d=[],u=[],p=[];y(),this.setIndex(p),this.setAttribute("position",new Yt(f,3)),this.setAttribute("normal",new Yt(d,3)),this.setAttribute("uv",new Yt(u,2));function y(){for(let E=0;E<e;E++)m(E);m(r===!1?e:0),v(),g()}function m(E){h=t.getPointAt(E/e,h);const S=a.normals[E],R=a.binormals[E];for(let T=0;T<=s;T++){const _=T/s*Math.PI*2,b=Math.sin(_),O=-Math.cos(_);l.x=O*S.x+b*R.x,l.y=O*S.y+b*R.y,l.z=O*S.z+b*R.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,f.push(o.x,o.y,o.z)}}function g(){for(let E=1;E<=e;E++)for(let S=1;S<=s;S++){const R=(s+1)*(E-1)+(S-1),T=(s+1)*E+(S-1),_=(s+1)*E+S,b=(s+1)*(E-1)+S;p.push(R,T,b),p.push(T,_,b)}}function v(){for(let E=0;E<=e;E++)for(let S=0;S<=s;S++)c.x=E/e,c.y=S/s,u.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new ua(new ha[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function ys(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];if(Gc(s))s.isRenderTargetTexture?(kt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone();else if(Array.isArray(s))if(Gc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][n]=r}else t[e][n]=s.slice();else t[e][n]=s}}return t}function tn(i){const t={};for(let e=0;e<i.length;e++){const n=ys(i[e]);for(const s in n)t[s]=n[s]}return t}function Gc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function op(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function gu(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ae.workingColorSpace}const lp={clone:ys,merge:tn};var cp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,hp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ai extends $i{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cp,this.fragmentShader=hp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ys(t.uniforms),this.uniformsGroups=op(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const s=t.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=e[s.value]||null;break;case"c":this.uniforms[n].value=new Kt().setHex(s.value);break;case"v2":this.uniforms[n].value=new lt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new D().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Re().fromArray(s.value);break;case"m3":this.uniforms[n].value=new Wt().fromArray(s.value);break;case"m4":this.uniforms[n].value=new fe().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class up extends Ai{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Vn extends $i{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=il,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class dp extends $i{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ad,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class fp extends $i{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class zl extends Ie{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class pp extends zl{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const eo=new fe,Hc=new D,Vc=new D;class mp{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tr,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new Re(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;Hc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Hc),Vc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Vc),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,s){eo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(eo,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;t.coordinateSystem===Qs||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(eo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Br=new D,zr=new Ms,Ln=new D;class _u extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=Tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Br,zr,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Br,zr,Ln.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Br,zr,Ln),Ln.x===1&&Ln.y===1&&Ln.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Br,zr,Ln.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const mi=new D,Wc=new lt,Xc=new lt;class En extends _u{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=js*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Xs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return js*2*Math.atan(Math.tan(Xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(mi.x,mi.y).multiplyScalar(-t/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mi.x,mi.y).multiplyScalar(-t/mi.z)}getViewSize(t,e){return this.getViewBounds(t,Wc,Xc),e.subVectors(Xc,Wc)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Xs*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class xu extends _u{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class gp extends mp{constructor(){super(new xu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _p extends zl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new gp}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}class xp extends zl{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}const cs=-90,hs=1;class al extends Ie{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new En(cs,hs,t,e);s.layers=this.layers,this.add(s);const r=new En(cs,hs,t,e);r.layers=this.layers,this.add(r);const a=new En(cs,hs,t,e);a.layers=this.layers,this.add(a);const o=new En(cs,hs,t,e);o.layers=this.layers,this.add(o);const l=new En(cs,hs,t,e);l.layers=this.layers,this.add(l);const c=new En(cs,hs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Qs)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=y,t.setRenderTarget(n,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,d,u),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class vp extends En{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}const qc=new fe;class yp{constructor(t,e,n=0,s=1/0){this.ray=new Il(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Cl,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,e.projectionMatrix.elements[14]).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):oe("Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return qc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(qc),this}intersectObject(t,e=!0,n=[]){return ol(t,this,n,e),n.sort($c),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)ol(t[s],this,n,e);return n.sort($c),n}}function $c(i,t){return i.distance-t.distance}function ol(i,t,e,n){let s=!0;if(i.layers.test(t.layers)&&i.raycast(t,e)===!1&&(s=!1),s===!0&&n===!0){const r=i.children;for(let a=0,o=r.length;a<o;a++)ol(r[a],t,e,!0)}}function Yc(i,t,e,n){const s=Sp(n);switch(e){case Vh:return i*t;case Sl:return i*t/s.components*s.byteLength;case Ml:return i*t/s.components*s.byteLength;case Hi:return i*t*2/s.components*s.byteLength;case bl:return i*t*2/s.components*s.byteLength;case Wh:return i*t*3/s.components*s.byteLength;case zn:return i*t*4/s.components*s.byteLength;case El:return i*t*4/s.components*s.byteLength;case qr:case $r:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Yr:case Jr:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ro:case Po:return Math.max(i,16)*Math.max(t,8)/4;case Ao:case Co:return Math.max(i,8)*Math.max(t,8)/2;case Lo:case Io:case No:case Uo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Do:case ea:case Fo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Bo:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case zo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case ko:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Go:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Ho:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Vo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Wo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Xo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case qo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case $o:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Yo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Jo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Zo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Ko:case Qo:case jo:return Math.ceil(i/4)*Math.ceil(t/4)*16;case tl:case el:return Math.ceil(i/4)*Math.ceil(t/4)*8;case na:case nl:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Sp(i){switch(i){case hn:case zh:return{byteLength:1,components:1};case Ks:case kh:case Hn:return{byteLength:2,components:1};case vl:case yl:return{byteLength:2,components:4};case Gn:case xl:case wn:return{byteLength:4,components:1};case Gh:case Hh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_l}}));typeof window<"u"&&(window.__THREE__?kt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_l);function vu(){let i=null,t=!1,e=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&i!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function Mp(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,f=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let u;if(c instanceof Float32Array)u=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)u=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)u=i.SHORT;else if(c instanceof Uint32Array)u=i.UNSIGNED_INT;else if(c instanceof Int32Array)u=i.INT;else if(c instanceof Int8Array)u=i.BYTE;else if(c instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:u,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const h=l.array,f=l.updateRanges;if(i.bindBuffer(c,o),f.length===0)i.bufferSubData(c,0,h);else{f.sort((u,p)=>u.start-p.start);let d=0;for(let u=1;u<f.length;u++){const p=f[d],y=f[u];y.start<=p.start+p.count+1?p.count=Math.max(p.count,y.start+y.count-p.start):(++d,f[d]=y)}f.length=d+1;for(let u=0,p=f.length;u<p;u++){const y=f[u];i.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var bp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ep=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,wp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ap=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Rp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Cp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Pp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Lp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Ip=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Dp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Np=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Up=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Fp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Op=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,kp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Hp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Vp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Wp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Xp=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,qp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,$p=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,Yp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Jp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Zp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Kp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Qp="gl_FragColor = linearToOutputTexel( gl_FragColor );",jp=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,em=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,nm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,im=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,am=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,om=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,hm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,um=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dm=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,fm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,pm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,mm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gm=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_m=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,vm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ym=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Sm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bm=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Em=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,wm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tm=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Am=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Rm=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Cm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Pm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Lm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Im=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Um=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Fm=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Om=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,km=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Hm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Vm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Xm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,qm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$m=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ym=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Km=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Qm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,jm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,eg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,ng=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ig=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,sg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,rg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,ag=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,og=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,lg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ug=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,dg=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fg=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,_g=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,vg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Sg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Mg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bg=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Eg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wg=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ag=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Cg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Pg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Lg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ig=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Dg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ng=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ug=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Fg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Og=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Bg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Vg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Wg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,$g=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Kg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Qg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,jg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,t0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,e0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Zt={alphahash_fragment:bp,alphahash_pars_fragment:Ep,alphamap_fragment:wp,alphamap_pars_fragment:Tp,alphatest_fragment:Ap,alphatest_pars_fragment:Rp,aomap_fragment:Cp,aomap_pars_fragment:Pp,batching_pars_vertex:Lp,batching_vertex:Ip,begin_vertex:Dp,beginnormal_vertex:Np,bsdfs:Up,iridescence_fragment:Fp,bumpmap_pars_fragment:Op,clipping_planes_fragment:Bp,clipping_planes_pars_fragment:zp,clipping_planes_pars_vertex:kp,clipping_planes_vertex:Gp,color_fragment:Hp,color_pars_fragment:Vp,color_pars_vertex:Wp,color_vertex:Xp,common:qp,defaultnormal_vertex:$p,displacementmap_pars_vertex:Yp,displacementmap_vertex:Jp,emissivemap_fragment:Zp,emissivemap_pars_fragment:Kp,colorspace_fragment:Qp,colorspace_pars_fragment:jp,envmap_fragment:tm,envmap_common_pars_fragment:em,envmap_pars_fragment:nm,envmap_pars_vertex:im,envmap_physical_pars_fragment:pm,envmap_vertex:sm,fog_vertex:rm,fog_pars_vertex:am,fog_fragment:om,fog_pars_fragment:lm,gradientmap_pars_fragment:cm,lightmap_pars_fragment:hm,lights_lambert_fragment:um,lights_lambert_pars_fragment:dm,lights_pars_begin:fm,lights_toon_fragment:mm,lights_toon_pars_fragment:gm,lights_phong_fragment:_m,lights_phong_pars_fragment:xm,lights_physical_fragment:vm,lights_physical_pars_fragment:ym,lights_fragment_begin:Sm,lights_fragment_maps:Mm,lights_fragment_end:bm,lightprobes_pars_fragment:Em,logdepthbuf_fragment:wm,logdepthbuf_pars_fragment:Tm,logdepthbuf_pars_vertex:Am,logdepthbuf_vertex:Rm,map_fragment:Cm,map_pars_fragment:Pm,map_particle_fragment:Lm,map_particle_pars_fragment:Im,metalnessmap_fragment:Dm,metalnessmap_pars_fragment:Nm,morphinstance_vertex:Um,morphcolor_vertex:Fm,morphnormal_vertex:Om,morphtarget_pars_vertex:Bm,morphtarget_vertex:zm,normal_fragment_begin:km,normal_fragment_maps:Gm,normal_pars_fragment:Hm,normal_pars_vertex:Vm,normal_vertex:Wm,normalmap_pars_fragment:Xm,clearcoat_normal_fragment_begin:qm,clearcoat_normal_fragment_maps:$m,clearcoat_pars_fragment:Ym,iridescence_pars_fragment:Jm,opaque_fragment:Zm,packing:Km,premultiplied_alpha_fragment:Qm,project_vertex:jm,dithering_fragment:tg,dithering_pars_fragment:eg,roughnessmap_fragment:ng,roughnessmap_pars_fragment:ig,shadowmap_pars_fragment:sg,shadowmap_pars_vertex:rg,shadowmap_vertex:ag,shadowmask_pars_fragment:og,skinbase_vertex:lg,skinning_pars_vertex:cg,skinning_vertex:hg,skinnormal_vertex:ug,specularmap_fragment:dg,specularmap_pars_fragment:fg,tonemapping_fragment:pg,tonemapping_pars_fragment:mg,transmission_fragment:gg,transmission_pars_fragment:_g,uv_pars_fragment:xg,uv_pars_vertex:vg,uv_vertex:yg,worldpos_vertex:Sg,background_vert:Mg,background_frag:bg,backgroundCube_vert:Eg,backgroundCube_frag:wg,cube_vert:Tg,cube_frag:Ag,depth_vert:Rg,depth_frag:Cg,distance_vert:Pg,distance_frag:Lg,equirect_vert:Ig,equirect_frag:Dg,linedashed_vert:Ng,linedashed_frag:Ug,meshbasic_vert:Fg,meshbasic_frag:Og,meshlambert_vert:Bg,meshlambert_frag:zg,meshmatcap_vert:kg,meshmatcap_frag:Gg,meshnormal_vert:Hg,meshnormal_frag:Vg,meshphong_vert:Wg,meshphong_frag:Xg,meshphysical_vert:qg,meshphysical_frag:$g,meshtoon_vert:Yg,meshtoon_frag:Jg,points_vert:Zg,points_frag:Kg,shadow_vert:Qg,shadow_frag:jg,sprite_vert:t0,sprite_frag:e0},Et={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},On={basic:{uniforms:tn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.fog]),vertexShader:Zt.meshbasic_vert,fragmentShader:Zt.meshbasic_frag},lambert:{uniforms:tn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Kt(0)},envMapIntensity:{value:1}}]),vertexShader:Zt.meshlambert_vert,fragmentShader:Zt.meshlambert_frag},phong:{uniforms:tn([Et.common,Et.specularmap,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,Et.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphong_vert,fragmentShader:Zt.meshphong_frag},standard:{uniforms:tn([Et.common,Et.envmap,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.roughnessmap,Et.metalnessmap,Et.fog,Et.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag},toon:{uniforms:tn([Et.common,Et.aomap,Et.lightmap,Et.emissivemap,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.gradientmap,Et.fog,Et.lights,{emissive:{value:new Kt(0)}}]),vertexShader:Zt.meshtoon_vert,fragmentShader:Zt.meshtoon_frag},matcap:{uniforms:tn([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,Et.fog,{matcap:{value:null}}]),vertexShader:Zt.meshmatcap_vert,fragmentShader:Zt.meshmatcap_frag},points:{uniforms:tn([Et.points,Et.fog]),vertexShader:Zt.points_vert,fragmentShader:Zt.points_frag},dashed:{uniforms:tn([Et.common,Et.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Zt.linedashed_vert,fragmentShader:Zt.linedashed_frag},depth:{uniforms:tn([Et.common,Et.displacementmap]),vertexShader:Zt.depth_vert,fragmentShader:Zt.depth_frag},normal:{uniforms:tn([Et.common,Et.bumpmap,Et.normalmap,Et.displacementmap,{opacity:{value:1}}]),vertexShader:Zt.meshnormal_vert,fragmentShader:Zt.meshnormal_frag},sprite:{uniforms:tn([Et.sprite,Et.fog]),vertexShader:Zt.sprite_vert,fragmentShader:Zt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Zt.background_vert,fragmentShader:Zt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:Zt.backgroundCube_vert,fragmentShader:Zt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Zt.cube_vert,fragmentShader:Zt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Zt.equirect_vert,fragmentShader:Zt.equirect_frag},distance:{uniforms:tn([Et.common,Et.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Zt.distance_vert,fragmentShader:Zt.distance_frag},shadow:{uniforms:tn([Et.lights,Et.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:Zt.shadow_vert,fragmentShader:Zt.shadow_frag}};On.physical={uniforms:tn([On.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Wt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:Zt.meshphysical_vert,fragmentShader:Zt.meshphysical_frag};const kr={r:0,b:0,g:0},n0=new fe,yu=new Wt;yu.set(-1,0,0,0,1,0,0,0,1);function i0(i,t,e,n,s,r){const a=new Kt(0);let o=s===!0?0:1,l,c,h=null,f=0,d=null;function u(v){let E=v.isScene===!0?v.background:null;if(E&&E.isTexture){const S=v.backgroundBlurriness>0;E=t.get(E,S)}return E}function p(v){let E=!1;const S=u(v);S===null?m(a,o):S&&S.isColor&&(m(S,1),E=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?e.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(v,E){const S=u(E);S&&S.isCubeTexture?(c===void 0&&(c=new qt(new Cn(1,1,1),new Ai({name:"BackgroundCubeMaterial",uniforms:ys(On.backgroundCube.uniforms),vertexShader:On.backgroundCube.vertexShader,fragmentShader:On.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,T,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(n0.makeRotationFromEuler(E.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(yu),c.material.toneMapped=ae.getTransfer(S.colorSpace)!==me,(h!==S||f!==S.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,h=S,f=S.version,d=i.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new qt(new Ri(2,2),new Ai({name:"BackgroundMaterial",uniforms:ys(On.background.uniforms),vertexShader:On.background.vertexShader,fragmentShader:On.background.fragmentShader,side:Gi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=ae.getTransfer(S.colorSpace)!==me,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||f!==S.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,h=S,f=S.version,d=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,E){v.getRGB(kr,gu(i)),e.buffers.color.setClear(kr.r,kr.g,kr.b,E,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,E=1){a.set(v),o=E,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:p,addToRenderList:y,dispose:g}}function s0(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(L,z,$,I,W){let Z=!1;const G=f(L,I,$,z);r!==G&&(r=G,c(r.object)),Z=u(L,I,$,W),Z&&p(L,I,$,W),W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,S(L,z,$,I),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function l(){return i.createVertexArray()}function c(L){return i.bindVertexArray(L)}function h(L){return i.deleteVertexArray(L)}function f(L,z,$,I){const W=I.wireframe===!0;let Z=n[z.id];Z===void 0&&(Z={},n[z.id]=Z);const G=L.isInstancedMesh===!0?L.id:0;let rt=Z[G];rt===void 0&&(rt={},Z[G]=rt);let Y=rt[$.id];Y===void 0&&(Y={},rt[$.id]=Y);let N=Y[W];return N===void 0&&(N=d(l()),Y[W]=N),N}function d(L){const z=[],$=[],I=[];for(let W=0;W<e;W++)z[W]=0,$[W]=0,I[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:$,attributeDivisors:I,object:L,attributes:{},index:null}}function u(L,z,$,I){const W=r.attributes,Z=z.attributes;let G=0;const rt=$.getAttributes();for(const Y in rt)if(rt[Y].location>=0){const U=W[Y];let K=Z[Y];if(K===void 0&&(Y==="instanceMatrix"&&L.instanceMatrix&&(K=L.instanceMatrix),Y==="instanceColor"&&L.instanceColor&&(K=L.instanceColor)),U===void 0||U.attribute!==K||K&&U.data!==K.data)return!0;G++}return r.attributesNum!==G||r.index!==I}function p(L,z,$,I){const W={},Z=z.attributes;let G=0;const rt=$.getAttributes();for(const Y in rt)if(rt[Y].location>=0){let U=Z[Y];U===void 0&&(Y==="instanceMatrix"&&L.instanceMatrix&&(U=L.instanceMatrix),Y==="instanceColor"&&L.instanceColor&&(U=L.instanceColor));const K={};K.attribute=U,U&&U.data&&(K.data=U.data),W[Y]=K,G++}r.attributes=W,r.attributesNum=G,r.index=I}function y(){const L=r.newAttributes;for(let z=0,$=L.length;z<$;z++)L[z]=0}function m(L){g(L,0)}function g(L,z){const $=r.newAttributes,I=r.enabledAttributes,W=r.attributeDivisors;$[L]=1,I[L]===0&&(i.enableVertexAttribArray(L),I[L]=1),W[L]!==z&&(i.vertexAttribDivisor(L,z),W[L]=z)}function v(){const L=r.newAttributes,z=r.enabledAttributes;for(let $=0,I=z.length;$<I;$++)z[$]!==L[$]&&(i.disableVertexAttribArray($),z[$]=0)}function E(L,z,$,I,W,Z,G){G===!0?i.vertexAttribIPointer(L,z,$,W,Z):i.vertexAttribPointer(L,z,$,I,W,Z)}function S(L,z,$,I){y();const W=I.attributes,Z=$.getAttributes(),G=z.defaultAttributeValues;for(const rt in Z){const Y=Z[rt];if(Y.location>=0){let N=W[rt];if(N===void 0&&(rt==="instanceMatrix"&&L.instanceMatrix&&(N=L.instanceMatrix),rt==="instanceColor"&&L.instanceColor&&(N=L.instanceColor)),N!==void 0){const U=N.normalized,K=N.itemSize,st=t.get(N);if(st===void 0)continue;const k=st.buffer,et=st.type,pt=st.bytesPerElement,Dt=et===i.INT||et===i.UNSIGNED_INT||N.gpuType===xl;if(N.isInterleavedBufferAttribute){const ht=N.data,Lt=ht.isInterleavedBuffer===!0?ht.stride:ht.itemSize,Se=N.offset;if(ht.isInstancedInterleavedBuffer||ht.isInstancedBufferAttribute){for(let zt=0;zt<Y.locationSize;zt++)g(Y.location+zt,ht.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let zt=0;zt<Y.locationSize;zt++)m(Y.location+zt);i.bindBuffer(i.ARRAY_BUFFER,k);for(let zt=0;zt<Y.locationSize;zt++)E(Y.location+zt,K/Y.locationSize,et,U,Lt*pt,(Se+K/Y.locationSize*zt)*pt,Dt)}else{if(N.isInstancedBufferAttribute){for(let ht=0;ht<Y.locationSize;ht++)g(Y.location+ht,N.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let ht=0;ht<Y.locationSize;ht++)m(Y.location+ht);i.bindBuffer(i.ARRAY_BUFFER,k);for(let ht=0;ht<Y.locationSize;ht++)E(Y.location+ht,K/Y.locationSize,et,U,K*pt,K/Y.locationSize*ht*pt,Dt)}}else if(G!==void 0){const U=G[rt];if(U!==void 0)switch(U.length){case 2:i.vertexAttrib2fv(Y.location,U);break;case 3:i.vertexAttrib3fv(Y.location,U);break;case 4:i.vertexAttrib4fv(Y.location,U);break;default:i.vertexAttrib1fv(Y.location,U)}}}}v()}function R(){O();for(const L in n){const z=n[L];for(const $ in z){const I=z[$];for(const W in I){const Z=I[W];for(const G in Z)h(Z[G].object),delete Z[G];delete I[W]}}delete n[L]}}function T(L){if(n[L.id]===void 0)return;const z=n[L.id];for(const $ in z){const I=z[$];for(const W in I){const Z=I[W];for(const G in Z)h(Z[G].object),delete Z[G];delete I[W]}}delete n[L.id]}function _(L){for(const z in n){const $=n[z];for(const I in $){const W=$[I];if(W[L.id]===void 0)continue;const Z=W[L.id];for(const G in Z)h(Z[G].object),delete Z[G];delete W[L.id]}}}function b(L){for(const z in n){const $=n[z],I=L.isInstancedMesh===!0?L.id:0,W=$[I];if(W!==void 0){for(const Z in W){const G=W[Z];for(const rt in G)h(G[rt].object),delete G[rt];delete W[Z]}delete $[I],Object.keys($).length===0&&delete n[z]}}}function O(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:O,resetDefaultState:C,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:_,initAttributes:y,enableAttribute:m,disableUnusedAttributes:v}}function r0(i,t,e){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(i.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let d=0;for(let u=0;u<h;u++)d+=c[u];e.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function a0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const _=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(_){return!(_!==zn&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){const b=_===Hn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(_!==hn&&_!==wn&&!b&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(kt("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&f===!1;e.reversedDepthBuffer===!0&&f===!1&&kt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&f===!0&&kt("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:u,maxVertexTextures:p,maxTextureSize:y,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:v,maxVaryings:E,maxFragmentUniforms:S,maxSamples:R,samples:T}}function o0(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new xi,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const u=f.length!==0||d||n!==0||s;return s=d,n=f.length,u},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,d){e=h(f,d,0)},this.setState=function(f,d,u){const p=f.clippingPlanes,y=f.clipIntersection,m=f.clipShadows,g=i.get(f);if(!s||p===null||p.length===0||r&&!m)r?h(null):c();else{const v=r?0:n,E=v*4;let S=g.clippingState||null;l.value=S,S=h(p,d,E,u);for(let R=0;R!==E;++R)S[R]=e[R];g.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,d,u,p){const y=f!==null?f.length:0;let m=null;if(y!==0){if(m=l.value,p!==!0||m===null){const g=u+y*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<g)&&(m=new Float32Array(g));for(let E=0,S=u;E!==y;++E,S+=4)a.copy(f[E]).applyMatrix4(v,o),a.normal.toArray(m,S),m[S+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}class kl extends kn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new ru(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Cn(5,5,5),r=new Ai({name:"CubemapFromEquirect",uniforms:ys(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:fs});r.uniforms.tEquirect.value=e;const a=new qt(s,r),o=e.minFilter;return e.minFilter===ei&&(e.minFilter=sn),new al(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Jc=256,l0=3,c0=20,Su=256,Mu=16,h0=3,u0=new D,d0=new Kt;class da{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new al(1,10,null),this._boxMesh=new qt(new Cn(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,s=100,r={}){const{size:a=256,position:o=u0}=r,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);const f=l.autoClear,d=l.autoClearColor,u=l.autoClearDepth,p=l.autoClearStencil,y=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(t.background=l.getClearColor(d0));const m=new al(n,s,h);return m.position.copy(o),m.update(l,t),l.autoClear=f,l.autoClearColor=d,l.autoClearDepth=u,l.autoClearStencil=p,t.background=y,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(Jc,Zh(t))}_fromTexture(t,e){t.mapping===gs||t.mapping===Zs?this._setSize(t.image.length===0?Jc:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=Zc(t,!1,!1),n=Math.log2(t)-l0;for(let s=0;s<=n;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=Zc(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===gs||t.mapping===Zs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qc()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=Kc()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=f0(),this._integrationMaterial=p0());const e=this._cubeSize,n=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/Mu);for(let a=0;a<=n;a++){const o=da.lodToRoughness(a,n);if(a>n-h0)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{const l=o>0?Math.log2(e)+.5*Math.log2(6/(Su*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=m0());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,n),s.envMap.value=t.texture,this._renderCube(r,0,n)}}function Zc(i,t,e){return new kl(i,{minFilter:ei,generateMipmaps:t,type:Hn,colorSpace:ia,depthBuffer:e})}function ar(i,t,e){return new Ai({name:i,uniforms:t,vertexShader:Zt.cube_vert,fragmentShader:e,side:on,blending:fs,depthTest:!1,depthWrite:!1})}function f0(){return ar("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Su}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function p0(){return ar("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Mu}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function m0(){return ar("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${c0}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function Kc(){return ar("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Qc(){return ar("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function g0(i){let t=new WeakMap,e=new WeakMap,n=null;function s(d,u=!1){return d==null?null:u?a(d):r(d)}function r(d){if(d&&d.isTexture){const u=d.mapping;if(u===Ta||u===Aa)if(t.has(d)){const p=t.get(d).texture;return o(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const y=new kl(p.height);return y.fromEquirectangularTexture(i,d),t.set(d,y),d.addEventListener("dispose",c),o(y.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){const u=d.mapping,p=u===Ta||u===Aa,y=u===gs||u===Zs;if(p||y){let m=e.get(d);const g=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return n===null&&(n=new da(i)),m=p?n.fromEquirectangular(d,m):n.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{const v=d.image;return p&&v&&v.height>0||y&&v&&l(v)?(n===null&&(n=new da(i)),m=p?n.fromEquirectangular(d):n.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,u){return u===Ta?d.mapping=gs:u===Aa&&(d.mapping=Zs),d}function l(d){let u=0;const p=6;for(let y=0;y<p;y++)d[y]!==void 0&&u++;return u===p}function c(d){const u=d.target;u.removeEventListener("dispose",c);const p=t.get(u);p!==void 0&&(t.delete(u),p.dispose())}function h(d){const u=d.target;u.removeEventListener("dispose",h);const p=e.get(u);p!==void 0&&(e.delete(u),p.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:f}}function _0(i){const t={};function e(n){if(t[n]!==void 0)return t[n];const s=i.getExtension(n);return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Zr("WebGLRenderer: "+n+" extension not supported."),s}}}function x0(i,t,e,n){const s={},r=new WeakMap,a=new FinalizationRegistry(p=>delete s[p]);function o(p){l(p.target)}function l(p){p.index!==null&&t.remove(p.index);for(const m in p.attributes)t.remove(p.attributes[m]);p.removeEventListener("dispose",o),delete s[p.id],a.unregister(p);const y=r.get(p);y&&(t.remove(y),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,e.memory.geometries--}function c(p,y){return s[y.id]!==void 0||(y.addEventListener("dispose",o),s[y.id]=new WeakRef(y),a.register(y,y.id,y),e.memory.geometries++),y}function h(p){const y=p.attributes;for(const m in y)t.update(y[m],i.ARRAY_BUFFER)}function f(p){const y=p.index,m=p.attributes.position;let g=0;if(m===void 0)return;const v=y!==null?y.array.length:m.array.length/3-1,E=m.count>=65535?tu:jh,S=new E(Math.ceil(v/3)*6,1),R=S.array;if(y!==null){const _=y.array;g=y.version;for(let b=0,O=0;b<v;b+=3){const C=_[b+0],L=_[b+1],z=_[b+2];R[O++]=C,R[O++]=L,R[O++]=L,R[O++]=z,R[O++]=z,R[O++]=C}}else{g=m.version;for(let _=0,b=0;_<v;_+=3){const O=_+0,C=_+1,L=_+2;R[b++]=O,R[b++]=C,R[b++]=C,R[b++]=L,R[b++]=L,R[b++]=O}}S.version=g;const T=r.get(p);T&&t.remove(T),r.set(p,S)}function d(p){const y=r.get(p);if(y){const m=p.index;m!==null&&y.version<m.version&&f(p)}else f(p);return r.get(p)}function u(){for(const p in s){const y=s[p].deref();y!==void 0&&l(y)}}return{get:c,update:h,getWireframeAttribute:d,dispose:u}}function v0(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,d){i.drawElements(n,d,r,f*a),e.update(d,n,1)}function c(f,d,u){u!==0&&(i.drawElementsInstanced(n,d,r,f*a,u),e.update(d,n,u))}function h(f,d,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,u);let y=0;for(let m=0;m<u;m++)y+=d[m];e.update(y,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function y0(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:oe("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function S0(i,t,e){const n=new WeakMap,s=new Re;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==f){let C=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",C)};var u=C;d!==void 0&&d.texture.dispose();const p=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let S=0;p===!0&&(S=1),y===!0&&(S=2),m===!0&&(S=3);let R=o.attributes.position.count*S,T=1;R>t.maxTextureSize&&(T=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const _=new Float32Array(R*T*4*f),b=new Kh(_,R,T,f);b.type=wn,b.needsUpdate=!0;const O=S*4;for(let L=0;L<f;L++){const z=g[L],$=v[L],I=E[L],W=R*T*4*L;for(let Z=0;Z<z.count;Z++){const G=Z*O;p===!0&&(s.fromBufferAttribute(z,Z),_[W+G+0]=s.x,_[W+G+1]=s.y,_[W+G+2]=s.z,_[W+G+3]=0),y===!0&&(s.fromBufferAttribute($,Z),_[W+G+4]=s.x,_[W+G+5]=s.y,_[W+G+6]=s.z,_[W+G+7]=0),m===!0&&(s.fromBufferAttribute(I,Z),_[W+G+8]=s.x,_[W+G+9]=s.y,_[W+G+10]=s.z,_[W+G+11]=I.itemSize===4?s.w:1)}}d={count:f,texture:b,size:new lt(R,T)},n.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let p=0;for(let m=0;m<c.length;m++)p+=c[m];const y=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function M0(i,t,e,n,s){let r=new WeakMap;function a(c){const h=s.render.frame,f=c.geometry,d=t.get(c,f);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const u=c.skeleton;r.get(u)!==h&&(u.update(),r.set(u,h))}return d}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const b0={[Lh]:"LINEAR_TONE_MAPPING",[Ih]:"REINHARD_TONE_MAPPING",[Dh]:"CINEON_TONE_MAPPING",[Nh]:"ACES_FILMIC_TONE_MAPPING",[Fh]:"AGX_TONE_MAPPING",[Oh]:"NEUTRAL_TONE_MAPPING",[Uh]:"CUSTOM_TONE_MAPPING"};function E0(i,t,e,n,s,r){const a=new kn(t,e,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const h=new Ae;h.setAttribute("position",new Yt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Yt([0,2,0,0,2,0],2));const f=new up({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new qt(h,f),u=new xu(-1,1,1,-1,0,1);let p=null,y=null,m=!1,g,v=null,E=[],S=!1;this.setSize=function(R,T){a.setSize(R,T),o!==null&&o.setSize(R,T),l!==null&&l.setSize(R,T);for(let _=0;_<E.length;_++){const b=E[_];b.setSize&&b.setSize(R,T)}},this.setEffects=function(R){E=R,S=E.length>0&&E[0].isRenderPass===!0;const T=a.width,_=a.height;E.length>0&&o===null&&(o=new kn(T,_,{type:Hn,depthBuffer:!1,stencilBuffer:!1}),l=new kn(T,_,{type:Hn,depthBuffer:!1,stencilBuffer:!1}));const b=s===!0&&E.some(O=>O.needsDepthTexture===!0);b!==(a.depthTexture!==null)&&(b===!0&&c===null&&(c=new xs(T,_),r===!0&&(c.format=yi,c.type=_s)),a.dispose(),a.depthTexture=b?c:null,a.resolveDepthBuffer=b,a.storeMultisampledDepthBuffer=b);for(let O=0;O<E.length;O++){const C=E[O];C.setSize&&C.setSize(T,_),b&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(R,T){if(m||R.toneMapping===ii&&E.length===0)return!1;if(v=T,T!==null){const _=T.width,b=T.height;(a.width!==_||a.height!==b)&&this.setSize(_,b)}return S===!1&&R.setRenderTarget(a),g=R.toneMapping,R.toneMapping=ii,!0},this.hasRenderPass=function(){return S},this.end=function(R,T){R.toneMapping=g,m=!0;let _=a,b=o;for(let O=0;O<E.length;O++){const C=E[O];C.enabled!==!1&&(C.render(R,b,_,T),C.needsSwap!==!1&&(_=b,b=b===o?l:o))}if(p!==R.outputColorSpace||y!==R.toneMapping){p=R.outputColorSpace,y=R.toneMapping,f.defines={},ae.getTransfer(p)===me&&(f.defines.SRGB_TRANSFER="");const O=b0[y];O&&(f.defines[O]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=_.texture,R.setRenderTarget(v),R.render(d,u),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),f.dispose()}}const bu=new Ke,Eu=new xs(1,1),wu=new au(1),Tu=new Kh,Au=new af,Ru=new ru,jc=[],th=[],eh=new Float32Array(16),nh=new Float32Array(9),ih=new Float32Array(4);function Es(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=jc[s];if(r===void 0&&(r=new Float32Array(s),jc[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function Ne(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function Ue(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function va(i,t){let e=th[t];e===void 0&&(e=new Int32Array(t),th[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function w0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function T0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2fv(this.addr,t),Ue(e,t)}}function A0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;i.uniform3fv(this.addr,t),Ue(e,t)}}function R0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4fv(this.addr,t),Ue(e,t)}}function C0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;ih.set(n),i.uniformMatrix2fv(this.addr,!1,ih),Ue(e,n)}}function P0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;nh.set(n),i.uniformMatrix3fv(this.addr,!1,nh),Ue(e,n)}}function L0(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),Ue(e,t)}else{if(Ne(e,n))return;eh.set(n),i.uniformMatrix4fv(this.addr,!1,eh),Ue(e,n)}}function I0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function D0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2iv(this.addr,t),Ue(e,t)}}function N0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3iv(this.addr,t),Ue(e,t)}}function U0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4iv(this.addr,t),Ue(e,t)}}function F0(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function O0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;i.uniform2uiv(this.addr,t),Ue(e,t)}}function B0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;i.uniform3uiv(this.addr,t),Ue(e,t)}}function z0(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;i.uniform4uiv(this.addr,t),Ue(e,t)}}function ya(i){return i.version===0&&(i.compareFunction=$h,i.needsUpdate=!0),i}function k0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=ya(Eu):r=bu,e.setTexture2D(t||r,s)}function G0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Au,s)}function H0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=ya(wu):r=Ru,e.setTextureCube(t||r,s)}function V0(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Tu,s)}function W0(i){switch(i){case 5126:return w0;case 35664:return T0;case 35665:return A0;case 35666:return R0;case 35674:return C0;case 35675:return P0;case 35676:return L0;case 5124:case 35670:return I0;case 35667:case 35671:return D0;case 35668:case 35672:return N0;case 35669:case 35673:return U0;case 5125:return F0;case 36294:return O0;case 36295:return B0;case 36296:return z0;case 35678:case 36198:case 36298:case 36306:case 35682:return k0;case 35679:case 36299:case 36307:return G0;case 35680:case 36300:case 36308:case 36293:return H0;case 36289:case 36303:case 36311:case 36292:return V0}}function X0(i,t){i.uniform1fv(this.addr,t)}function q0(i,t){const e=Es(t,this.size,2);i.uniform2fv(this.addr,e)}function $0(i,t){const e=Es(t,this.size,3);i.uniform3fv(this.addr,e)}function Y0(i,t){const e=Es(t,this.size,4);i.uniform4fv(this.addr,e)}function J0(i,t){const e=Es(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Z0(i,t){const e=Es(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function K0(i,t){const e=Es(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Q0(i,t){i.uniform1iv(this.addr,t)}function j0(i,t){i.uniform2iv(this.addr,t)}function t_(i,t){i.uniform3iv(this.addr,t)}function e_(i,t){i.uniform4iv(this.addr,t)}function n_(i,t){i.uniform1uiv(this.addr,t)}function i_(i,t){i.uniform2uiv(this.addr,t)}function s_(i,t){i.uniform3uiv(this.addr,t)}function r_(i,t){i.uniform4uiv(this.addr,t)}function a_(i,t,e){const n=this.cache,s=t.length,r=va(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=ya(Eu):a=bu;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function o_(i,t,e){const n=this.cache,s=t.length,r=va(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Au,r[a])}function l_(i,t,e){const n=this.cache,s=t.length,r=va(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=ya(wu):a=Ru;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function c_(i,t,e){const n=this.cache,s=t.length,r=va(e,s);Ne(n,r)||(i.uniform1iv(this.addr,r),Ue(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Tu,r[a])}function h_(i){switch(i){case 5126:return X0;case 35664:return q0;case 35665:return $0;case 35666:return Y0;case 35674:return J0;case 35675:return Z0;case 35676:return K0;case 5124:case 35670:return Q0;case 35667:case 35671:return j0;case 35668:case 35672:return t_;case 35669:case 35673:return e_;case 5125:return n_;case 36294:return i_;case 36295:return s_;case 36296:return r_;case 35678:case 36198:case 36298:case 36306:case 35682:return a_;case 35679:case 36299:case 36307:return o_;case 35680:case 36300:case 36308:case 36293:return l_;case 36289:case 36303:case 36311:case 36292:return c_}}class u_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=W0(e.type)}}class d_{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=h_(e.type)}}class f_{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const no=/(\w+)(\])?(\[|\.)?/g;function sh(i,t){i.seq.push(t),i.map[t.id]=t}function p_(i,t,e){const n=i.name,s=n.length;for(no.lastIndex=0;;){const r=no.exec(n),a=no.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){sh(e,c===void 0?new u_(o,i,t):new d_(o,i,t));break}else{let f=e.map[o];f===void 0&&(f=new f_(o),sh(e,f)),e=f}}}class Kr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);p_(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function rh(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const m_=37297;let g_=0;function __(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const ah=new Wt;function x_(i){ae._getMatrix(ah,ae.workingColorSpace,i);const t=`mat3( ${ah.elements.map(e=>e.toFixed(4))} )`;switch(ae.getTransfer(i)){case sa:return[t,"LinearTransferOETF"];case me:return[t,"sRGBTransferOETF"];default:return kt("WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function oh(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+__(i.getShaderSource(t),o)}else return r}function v_(i,t){const e=x_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const y_={[Lh]:"Linear",[Ih]:"Reinhard",[Dh]:"Cineon",[Nh]:"ACESFilmic",[Fh]:"AgX",[Oh]:"Neutral",[Uh]:"Custom"};function S_(i,t){const e=y_[t];return e===void 0?(kt("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Gr=new D;function M_(){ae.getLuminanceCoefficients(Gr);const i=Gr.x.toFixed(4),t=Gr.y.toFixed(4),e=Gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function b_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hs).join(`
`)}function E_(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function w_(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Hs(i){return i!==""}function lh(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function ch(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const T_=/^[ \t]*#include +<([\w\d./]+)>/gm;function ll(i){return i.replace(T_,A_)}function A_(i,t){const e=Zt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return ll(e)}const R_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function hh(i){return i.replace(R_,C_)}function C_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function uh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const P_={[Vs]:"SHADOWMAP_TYPE_PCF",[ks]:"SHADOWMAP_TYPE_VSM"};function L_(i){return P_[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const I_={[Zs]:"ENVMAP_MODE_REFRACTION"};function D_(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":I_[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const N_={[Ph]:"ENVMAP_BLENDING_MULTIPLY",[Ed]:"ENVMAP_BLENDING_MIX",[wd]:"ENVMAP_BLENDING_ADD"};function U_(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":N_[i.combine]||"ENVMAP_BLENDING_NONE"}function F_(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=L_(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=D_(e),f=U_(e),d=b_(e),u=E_(r),p=s.createProgram();let y,m,g=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(Hs).join(`
`),y.length>0&&(y+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u].filter(Hs).join(`
`),m.length>0&&(m+=`
`)):(y=[uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hs).join(`
`),m=[uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,u,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ii?"#define TONE_MAPPING":"",e.toneMapping!==ii?Zt.tonemapping_pars_fragment:"",e.toneMapping!==ii?S_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Zt.colorspace_pars_fragment,v_("linearToOutputTexel",e.outputColorSpace),M_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Hs).join(`
`)),a=ll(a),a=lh(a,e),a=ch(a,e),o=ll(o),o=lh(o,e),o=ch(o,e),a=hh(a),o=hh(o),e.isRawShaderMaterial!==!0&&(g=`#version 300 es
`,y=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,m=["#define varying in",e.glslVersion===ac?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ac?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const v=g+y+a,E=g+m+o,S=rh(s,s.VERTEX_SHADER,v),R=rh(s,s.FRAGMENT_SHADER,E);s.attachShader(p,S),s.attachShader(p,R),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function T(C){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(p)||"",z=s.getShaderInfoLog(S)||"",$=s.getShaderInfoLog(R)||"",I=L.trim(),W=z.trim(),Z=$.trim();let G=!0,rt=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,S,R);else{const Y=oh(s,S,"vertex"),N=oh(s,R,"fragment");oe("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+I+`
`+Y+`
`+N)}else I!==""?kt("WebGLProgram: Program Info Log:",I):(W===""||Z==="")&&(rt=!1);rt&&(C.diagnostics={runnable:G,programLog:I,vertexShader:{log:W,prefix:y},fragmentShader:{log:Z,prefix:m}})}s.deleteShader(S),s.deleteShader(R),_=new Kr(s,p),b=w_(s,p)}let _;this.getUniforms=function(){return _===void 0&&T(this),_};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let O=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=s.getProgramParameter(p,m_)),O},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=g_++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=S,this.fragmentShader=R,this}let O_=0;class B_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new z_(t),e.set(t,n)),n}}class z_{constructor(t){this.id=O_++,this.code=t,this.usedTimes=0}}function k_(i){return i===Hi||i===ea||i===na}function G_(i,t,e,n,s,r){const a=new Cl,o=new B_,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function u(_){return l.add(_),_===0?"uv":`uv${_}`}function p(_,b,O,C,L,z){const $=C.fog,I=L.geometry,W=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?C.environment:null,Z=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,G=t.get(_.envMap||W,Z),rt=d[_.type];let Y=n.precision;_.precision!==null&&(Y=n.getMaxPrecision(_.precision),Y!==_.precision&&kt("WebGLProgram.getParameters:",_.precision,"not supported, using",Y,"instead."));const N=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,U=N!==void 0?N.length:0;let K=0;I.morphAttributes.position!==void 0&&(K=1),I.morphAttributes.normal!==void 0&&(K=2),I.morphAttributes.color!==void 0&&(K=3);let st,k,et,pt;if(rt){const bt=On[rt];st=bt.vertexShader,k=bt.fragmentShader}else{st=_.vertexShader,k=_.fragmentShader;const bt=o.getVertexShaderStage(_),pe=o.getFragmentShaderStage(_);o.update(_,bt,pe),et=bt.id,pt=pe.id}const Dt=i.getRenderTarget(),ht=i.state.buffers.depth.getReversed(),Lt=L.isInstancedMesh===!0,Se=L.isBatchedMesh===!0,zt=!!_.map,Qt=!!_.matcap,ee=!!G,it=ee&&G.isPMREMTexture===!0,mt=!!_.aoMap,ut=!!_.lightMap,Tt=!!_.bumpMap&&_.wireframe===!1,Mt=!!_.normalMap,Vt=!!_.displacementMap,Nt=!!_.emissiveMap,ne=!!_.metalnessMap,ie=!!_.roughnessMap,ce=_.anisotropy>0,B=_.clearcoat>0,Ce=_.diffuseRoughness>0,jt=_.dispersion>0,ge=_.retroreflectivity>0,vt=_.iridescence>0,we=_.sheen>0,Bt=_.transmission>0,Gt=ce&&!!_.anisotropyMap,w=B&&!!_.clearcoatMap,x=B&&!!_.clearcoatNormalMap,V=B&&!!_.clearcoatRoughnessMap,at=Ce&&!!_.diffuseRoughnessMap,nt=vt&&!!_.iridescenceMap,dt=vt&&!!_.iridescenceThicknessMap,yt=we&&!!_.sheenColorMap,Q=we&&!!_.sheenRoughnessMap,j=!!_.specularMap,gt=!!_.specularColorMap,P=!!_.specularIntensityMap,tt=Bt&&!!_.transmissionMap,J=Bt&&!!_.thicknessMap,_t=!!_.gradientMap,ct=!!_.alphaMap,ft=_.alphaTest>0,Ut=!!_.alphaHash,Jt=!!_.extensions;let ot=ii;_.toneMapped&&(Dt===null||Dt.isXRRenderTarget===!0)&&(ot=i.toneMapping);const Ot=it?G.isCompressedCubeTexture?G.image[0].mipmaps:G.mipmaps:null,$t={shaderID:rt,shaderType:_.type,shaderName:_.name,vertexShader:st,fragmentShader:k,defines:_.defines,customVertexShaderID:et,customFragmentShaderID:pt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:Y,batching:Se,batchingColor:Se&&L._colorsTexture!==null,instancing:Lt,instancingColor:Lt&&L.instanceColor!==null,instancingMorph:Lt&&L.morphTexture!==null,outputColorSpace:Dt===null?i.outputColorSpace:Dt.isXRRenderTarget===!0?Dt.texture.colorSpace:ae.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:zt,matcap:Qt,envMap:ee,envMapMode:ee&&G.mapping,envMapPMREM:it,envMapMaxLod:it?Ot.length-1:null,envMapSize:it?Ot[0].width:null,aoMap:mt,lightMap:ut,bumpMap:Tt,normalMap:Mt,displacementMap:Vt,emissiveMap:Nt,normalMapObjectSpace:Mt&&_.normalMapType===Rd,normalMapTangentSpace:Mt&&_.normalMapType===il,packedNormalMap:Mt&&_.normalMapType===il&&k_(_.normalMap.format),metalnessMap:ne,roughnessMap:ie,anisotropy:ce,anisotropyMap:Gt,clearcoat:B,clearcoatMap:w,clearcoatNormalMap:x,clearcoatRoughnessMap:V,diffuseRoughness:Ce,diffuseRoughnessMap:at,dispersion:jt,retroreflection:ge,iridescence:vt,iridescenceMap:nt,iridescenceThicknessMap:dt,sheen:we,sheenColorMap:yt,sheenRoughnessMap:Q,specularMap:j,specularColorMap:gt,specularIntensityMap:P,transmission:Bt,transmissionMap:tt,thicknessMap:J,gradientMap:_t,opaque:_.transparent===!1&&_.blending===Ws&&_.alphaToCoverage===!1,alphaMap:ct,alphaTest:ft,alphaHash:Ut,combine:_.combine,mapUv:zt&&u(_.map.channel),aoMapUv:mt&&u(_.aoMap.channel),lightMapUv:ut&&u(_.lightMap.channel),bumpMapUv:Tt&&u(_.bumpMap.channel),normalMapUv:Mt&&u(_.normalMap.channel),displacementMapUv:Vt&&u(_.displacementMap.channel),emissiveMapUv:Nt&&u(_.emissiveMap.channel),metalnessMapUv:ne&&u(_.metalnessMap.channel),roughnessMapUv:ie&&u(_.roughnessMap.channel),anisotropyMapUv:Gt&&u(_.anisotropyMap.channel),clearcoatMapUv:w&&u(_.clearcoatMap.channel),clearcoatNormalMapUv:x&&u(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:V&&u(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:at&&u(_.diffuseRoughnessMap.channel),iridescenceMapUv:nt&&u(_.iridescenceMap.channel),iridescenceThicknessMapUv:dt&&u(_.iridescenceThicknessMap.channel),sheenColorMapUv:yt&&u(_.sheenColorMap.channel),sheenRoughnessMapUv:Q&&u(_.sheenRoughnessMap.channel),specularMapUv:j&&u(_.specularMap.channel),specularColorMapUv:gt&&u(_.specularColorMap.channel),specularIntensityMapUv:P&&u(_.specularIntensityMap.channel),transmissionMapUv:tt&&u(_.transmissionMap.channel),thicknessMapUv:J&&u(_.thicknessMap.channel),alphaMapUv:ct&&u(_.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Mt||ce),vertexNormals:!!I.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!I.attributes.uv&&(zt||ct),fog:!!$,useFog:_.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||I.attributes.normal===void 0&&Mt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:ht,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:U,morphTextureStride:K,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:z.filter(bt=>bt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:i.shadowMap.enabled&&O.length>0,shadowMapType:i.shadowMap.type,toneMapping:ot,decodeVideoTexture:zt&&_.map.isVideoTexture===!0&&ae.getTransfer(_.map.colorSpace)===me,decodeVideoTextureEmissive:Nt&&_.emissiveMap.isVideoTexture===!0&&ae.getTransfer(_.emissiveMap.colorSpace)===me,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===nn,flipSided:_.side===on,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Jt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Jt&&_.extensions.multiDraw===!0||Se)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return $t.vertexUv1s=l.has(1),$t.vertexUv2s=l.has(2),$t.vertexUv3s=l.has(3),l.clear(),$t}function y(_){const b=[];if(_.shaderID?b.push(_.shaderID):(b.push(_.customVertexShaderID),b.push(_.customFragmentShaderID)),_.defines!==void 0)for(const O in _.defines)b.push(O),b.push(_.defines[O]);return _.isRawShaderMaterial===!1&&(m(b,_),g(b,_),b.push(i.outputColorSpace)),b.push(_.customProgramCacheKey),b.join()}function m(_,b){_.push(b.precision),_.push(b.outputColorSpace),_.push(b.envMapMode),_.push(b.envMapPMREM),_.push(b.envMapMaxLod),_.push(b.envMapSize),_.push(b.mapUv),_.push(b.alphaMapUv),_.push(b.lightMapUv),_.push(b.aoMapUv),_.push(b.bumpMapUv),_.push(b.normalMapUv),_.push(b.displacementMapUv),_.push(b.emissiveMapUv),_.push(b.metalnessMapUv),_.push(b.roughnessMapUv),_.push(b.anisotropyMapUv),_.push(b.clearcoatMapUv),_.push(b.clearcoatNormalMapUv),_.push(b.clearcoatRoughnessMapUv),_.push(b.diffuseRoughnessMapUv),_.push(b.iridescenceMapUv),_.push(b.iridescenceThicknessMapUv),_.push(b.sheenColorMapUv),_.push(b.sheenRoughnessMapUv),_.push(b.specularMapUv),_.push(b.specularColorMapUv),_.push(b.specularIntensityMapUv),_.push(b.transmissionMapUv),_.push(b.thicknessMapUv),_.push(b.combine),_.push(b.fogExp2),_.push(b.sizeAttenuation),_.push(b.morphTargetsCount),_.push(b.numSunLights),_.push(b.numDirLights),_.push(b.numPointLights),_.push(b.numSpotLights),_.push(b.numSpotLightMaps),_.push(b.numHemiLights),_.push(b.numRectAreaLights),_.push(b.numSunLightShadows),_.push(b.numDirLightShadows),_.push(b.numPointLightShadows),_.push(b.numSpotLightShadows),_.push(b.numSpotLightShadowsWithMaps),_.push(b.numLightProbes),_.push(b.numLightProbeGrids),_.push(b.shadowMapType),_.push(b.toneMapping),_.push(b.numClippingPlanes),_.push(b.numClipIntersection),_.push(b.depthPacking)}function g(_,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.retroreflection&&a.enable(24),b.diffuseRoughness&&a.enable(25),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),b.packedNormalMap&&a.enable(22),b.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),b.numLightProbeGrids>0&&a.enable(22),b.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function v(_){const b=d[_.type];let O;if(b){const C=On[b];O=lp.clone(C.uniforms)}else O=_.uniforms;return O}function E(_,b){let O=h.get(b);return O!==void 0?++O.usedTimes:(O=new F_(i,b,_,s),c.push(O),h.set(b,O)),O}function S(_){if(--_.usedTimes===0){const b=c.indexOf(_);c[b]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function R(_){o.remove(_)}function T(){o.dispose()}return{getParameters:p,getProgramCacheKey:y,getUniforms:v,acquireProgram:E,releaseProgram:S,releaseShaderCache:R,programs:c,dispose:T}}function H_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function V_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.materialVariant!==t.materialVariant?i.materialVariant-t.materialVariant:i.z!==t.z?i.z-t.z:i.id-t.id}function dh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function fh(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d){let u=0;return d.isInstancedMesh&&(u+=2),d.isSkinnedMesh&&(u+=1),u}function o(d,u,p,y,m,g){let v=i[t];return v===void 0?(v={id:d.id,object:d,geometry:u,material:p,materialVariant:a(d),groupOrder:y,renderOrder:d.renderOrder,z:m,group:g},i[t]=v):(v.id=d.id,v.object=d,v.geometry=u,v.material=p,v.materialVariant=a(d),v.groupOrder=y,v.renderOrder=d.renderOrder,v.z=m,v.group=g),t++,v}function l(d,u,p,y,m,g,v){v.reversedDepth===!0&&(m=-m);const E=o(d,u,p,y,m,g);p.transmission>0?n.push(E):p.transparent===!0?s.push(E):e.push(E)}function c(d,u,p,y,m,g){const v=o(d,u,p,y,m,g);p.transmission>0?n.unshift(v):p.transparent===!0?s.unshift(v):e.unshift(v)}function h(d,u){e.length>1&&e.sort(d||V_),n.length>1&&n.sort(u||dh),s.length>1&&s.sort(u||dh)}function f(){for(let d=t,u=i.length;d<u;d++){const p=i[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:f,sort:h}}function W_(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new fh,i.set(n,[a])):s>=r.length?(a=new fh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function X_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new D,color:new Kt};break;case"SpotLight":e={position:new D,direction:new D,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new D,halfWidth:new D,halfHeight:new D};break}return i[t.id]=e,e}}}function q_(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let $_=0;function Y_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function J_(i){const t=new X_,e=q_(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const s=new D,r=new fe,a=new fe;function o(c){let h=0,f=0,d=0;for(let z=0;z<9;z++)n.probe[z].set(0,0,0);let u=0,p=0,y=0,m=0,g=0,v=0,E=0,S=0,R=0,T=0,_=0,b=0,O=0,C=0;c.sort(Y_);for(let z=0,$=c.length;z<$;z++){const I=c[z],W=I.color,Z=I.intensity,G=I.distance;let rt=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Hi?rt=I.shadow.map.texture:rt=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=W.r*Z,f+=W.g*Z,d+=W.b*Z;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(I.sh.coefficients[Y],Z);C++}else if(I.isSunLight){const Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const N=I.shadow,U=e.get(I);U.shadowIntensity=N.intensity,U.shadowBias=N.bias,U.shadowNormalBias=N.normalBias,U.shadowRadius=N.radius,U.shadowMapSize.copy(N.mapSize).multiply(N.getFrameExtents()),n.sunShadow[p]=U,n.sunShadowMap[p]=rt;const K=N.getViewportCount();for(let st=0;st<K;st++)n.sunShadowMatrix[y+st]=N.getMatrix(st),n.sunShadowCascade[y+st]=N._cascadeData[st];y+=K,p++}n.sun[u]=Y,u++}else if(I.isDirectionalLight){const Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const N=I.shadow,U=e.get(I);U.shadowIntensity=N.intensity,U.shadowBias=N.bias,U.shadowNormalBias=N.normalBias,U.shadowRadius=N.radius,U.shadowMapSize=N.mapSize,n.directionalShadow[m]=U,n.directionalShadowMap[m]=rt,n.directionalShadowMatrix[m]=I.shadow.matrix,R++}n.directional[m]=Y,m++}else if(I.isSpotLight){const Y=t.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(W).multiplyScalar(Z),Y.distance=G,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,n.spot[v]=Y;const N=I.shadow;if(I.map&&(n.spotLightMap[b]=I.map,b++,N.updateMatrices(I),I.castShadow&&O++),n.spotLightMatrix[v]=N.matrix,I.castShadow){const U=e.get(I);U.shadowIntensity=N.intensity,U.shadowBias=N.bias,U.shadowNormalBias=N.normalBias,U.shadowRadius=N.radius,U.shadowMapSize=N.mapSize,n.spotShadow[v]=U,n.spotShadowMap[v]=rt,_++}v++}else if(I.isRectAreaLight){const Y=t.get(I);Y.color.copy(W).multiplyScalar(Z),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),n.rectArea[E]=Y,E++}else if(I.isPointLight){const Y=t.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){const N=I.shadow,U=e.get(I);U.shadowIntensity=N.intensity,U.shadowBias=N.bias,U.shadowNormalBias=N.normalBias,U.shadowRadius=N.radius,U.shadowMapSize=N.mapSize,U.shadowCameraNear=N.camera.near,U.shadowCameraFar=N.camera.far,n.pointShadow[g]=U,n.pointShadowMap[g]=rt,n.pointShadowMatrix[g]=I.shadow.matrix,T++}n.point[g]=Y,g++}else if(I.isHemisphereLight){const Y=t.get(I);Y.skyColor.copy(I.color).multiplyScalar(Z),Y.groundColor.copy(I.groundColor).multiplyScalar(Z),n.hemi[S]=Y,S++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Et.LTC_FLOAT_1,n.rectAreaLTC2=Et.LTC_FLOAT_2):(n.rectAreaLTC1=Et.LTC_HALF_1,n.rectAreaLTC2=Et.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=d;const L=n.hash;(L.sunLength!==u||L.directionalLength!==m||L.pointLength!==g||L.spotLength!==v||L.rectAreaLength!==E||L.hemiLength!==S||L.numSunShadows!==p||L.numDirectionalShadows!==R||L.numPointShadows!==T||L.numSpotShadows!==_||L.numSpotMaps!==b||L.numLightProbes!==C)&&(n.sun.length=u,n.directional.length=m,n.spot.length=v,n.rectArea.length=E,n.point.length=g,n.hemi.length=S,n.sunShadow.length=p,n.sunShadowMap.length=p,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.directionalShadowMatrix.length=R,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+b-O,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=O,n.numLightProbes=C,L.sunLength=u,L.directionalLength=m,L.pointLength=g,L.spotLength=v,L.rectAreaLength=E,L.hemiLength=S,L.numSunShadows=p,L.numDirectionalShadows=R,L.numPointShadows=T,L.numSpotShadows=_,L.numSpotMaps=b,L.numLightProbes=C,n.version=$_++)}function l(c,h){let f=0,d=0,u=0,p=0,y=0,m=0;const g=h.matrixWorldInverse;for(let v=0,E=c.length;v<E;v++){const S=c[v];if(S.isSunLight){const R=n.sun[f];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(g),f++}else if(S.isDirectionalLight){const R=n.directional[d];R.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(g),d++}else if(S.isSpotLight){const R=n.spot[p];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(g),R.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(g),p++}else if(S.isRectAreaLight){const R=n.rectArea[y];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(g),a.identity(),r.copy(S.matrixWorld),r.premultiply(g),a.extractRotation(r),R.halfWidth.set(S.width*.5,0,0),R.halfHeight.set(0,S.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),y++}else if(S.isPointLight){const R=n.point[u];R.position.setFromMatrixPosition(S.matrixWorld),R.position.applyMatrix4(g),u++}else if(S.isHemisphereLight){const R=n.hemi[m];R.direction.setFromMatrixPosition(S.matrixWorld),R.direction.transformDirection(g),m++}}}return{setup:o,setupView:l,state:n}}function ph(i){const t=new J_(i),e=[],n=[],s=[];function r(f){h.camera=f,e.length=0,n.length=0,s.length=0}function a(f){f.isLightProbeGrid?s.push(f):e.push(f)}function o(f){n.push(f)}function l(){t.setup(e),s.sort((f,d)=>f.priority-d.priority||f.id-d.id)}function c(f){t.setupView(e,f)}const h={lightsArray:e,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Z_(i){let t=new WeakMap;function e(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new ph(i),t.set(s,[o])):r>=a.length?(o=new ph(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const K_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Q_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,j_=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],tx=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],mh=new fe,Fs=new D,io=new D;function ex(i,t,e){let n=new tr;const s=new lt,r=new lt,a=new Re,o=new dp,l=new fp,c={},h=e.maxTextureSize,f={[Gi]:on,[on]:Gi,[nn]:nn},d=new Ai({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:K_,fragmentShader:Q_}),u=d.clone();u.defines.HORIZONTAL_PASS=1;const p=new Ae;p.setAttribute("position",new gn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new qt(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vs;let g=this.type;this.render=function(T,_,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===rd&&(kt("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Vs);const O=i.getRenderTarget(),C=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),z=i.state;z.setBlending(fs),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const $=g!==this.type;$&&_.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(W=>W.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,W=T.length;I<W;I++){const Z=T[I],G=Z.shadow;if(G===void 0){kt("WebGLShadowMap:",Z,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const rt=G.getFrameExtents();s.multiply(rt),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/rt.x),s.x=r.x*rt.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/rt.y),s.y=r.y*rt.y,G.mapSize.y=r.y));const Y=i.state.buffers.depth.getReversed();if(G.camera._reversedDepth=Y,G.map===null||$===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===ks){if(Z.isPointLight){kt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new kn(s.x,s.y,{format:Hi,type:Hn,minFilter:sn,magFilter:sn,generateMipmaps:!1}),G.map.texture.name=Z.name+".shadowMap",G.map.depthTexture=new xs(s.x,s.y,wn),G.map.depthTexture.name=Z.name+".shadowMapDepth",G.map.depthTexture.format=Ei,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=We,G.map.depthTexture.magFilter=We}else Z.isPointLight?(G.map=new kl(s.x),G.map.depthTexture=new au(s.x,Gn)):(G.map=new kn(s.x,s.y),G.map.depthTexture=new xs(s.x,s.y,Gn)),G.map.depthTexture.name=Z.name+".shadowMap",G.map.depthTexture.format=Ei,this.type===Vs?(G.map.depthTexture.compareFunction=Y?qh:Xh,G.map.depthTexture.minFilter=sn,G.map.depthTexture.magFilter=sn):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=We,G.map.depthTexture.magFilter=We);G.camera.updateProjectionMatrix()}G.map.isWebGLCubeRenderTarget!==!0&&(G.map.width!==s.x||G.map.height!==s.y)&&G.map.setSize(s.x,s.y);const N=G.map.isWebGLCubeRenderTarget?6:G.getViewportCount();Z.isPointLight!==!0&&G.updateMatrices(Z,b);const U=(G.camera.layers.mask&4294967294)!==0?G.camera.layers:b.layers;for(let K=0;K<N;K++){const st=G.getCamera(K);if(Z.isPointLight){const k=G.camera,et=G.matrix,pt=Z.distance||k.far;pt!==k.far&&(k.far=pt,k.updateProjectionMatrix()),Fs.setFromMatrixPosition(Z.matrixWorld),k.position.copy(Fs),io.copy(k.position),io.add(j_[K]),k.up.copy(tx[K]),k.lookAt(io),k.updateMatrixWorld(),et.makeTranslation(-Fs.x,-Fs.y,-Fs.z),mh.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),G._frustum.setFromProjectionMatrix(mh,k.coordinateSystem,k.reversedDepth)}if(G.map.isWebGLCubeRenderTarget)i.setRenderTarget(G.map,K),i.clear();else{K===0&&(i.setRenderTarget(G.map),i.clear());const k=G.getViewport(K);a.set(r.x*k.x,r.y*k.y,r.x*k.z,r.y*k.w),z.viewport(a)}n=G.getFrustum(K),S(_,b,st,Z,U,this.type)}G.isPointLightShadow!==!0&&this.type===ks&&v(G,b),G.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(O,C,L)};function v(T,_){const b=t.update(y);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,u.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),T.mapPass===null?T.mapPass=new kn(s.x,s.y,{format:Hi,type:Hn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(_,null,b,d,y,null),u.uniforms.shadow_pass.value=T.mapPass.texture,u.uniforms.resolution.value.set(T.map.width,T.map.height),u.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(_,null,b,u,y,null)}function E(T,_,b,O){let C=null;const L=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(L!==void 0)C=L;else if(C=b.isPointLight===!0?l:o,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){const z=C.uuid,$=_.uuid;let I=c[z];I===void 0&&(I={},c[z]=I);let W=I[$];W===void 0&&(W=C.clone(),I[$]=W,_.addEventListener("dispose",R)),C=W}if(C.visible=_.visible,C.wireframe=_.wireframe,O===ks?C.side=_.shadowSide!==null?_.shadowSide:_.side:C.side=_.shadowSide!==null?_.shadowSide:f[_.side],C.alphaMap=_.alphaMap,C.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,C.map=_.map,C.clipShadows=_.clipShadows,C.clippingPlanes=_.clippingPlanes,C.clipIntersection=_.clipIntersection,C.displacementMap=_.displacementMap,C.displacementScale=_.displacementScale,C.displacementBias=_.displacementBias,C.wireframeLinewidth=_.wireframeLinewidth,C.linewidth=_.linewidth,b.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const z=i.properties.get(C);z.light=b}return C}function S(T,_,b,O,C,L){if(T.visible===!1)return;if(T.layers.test(C)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&L===ks)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);const I=t.update(T),W=T.material;if(Array.isArray(W)){const Z=I.groups;for(let G=0,rt=Z.length;G<rt;G++){const Y=Z[G],N=W[Y.materialIndex];if(N&&N.visible){const U=E(T,N,O,L);T.onBeforeShadow(i,T,_,b,I,U,Y),i.renderBufferDirect(b,null,I,U,T,Y),T.onAfterShadow(i,T,_,b,I,U,Y)}}}else if(W.visible){const Z=E(T,W,O,L);T.onBeforeShadow(i,T,_,b,I,Z,null),i.renderBufferDirect(b,null,I,Z,T,null),T.onAfterShadow(i,T,_,b,I,Z,null)}}const $=T.children;for(let I=0,W=$.length;I<W;I++)S($[I],_,b,O,C,L)}function R(T){T.target.removeEventListener("dispose",R);for(const b in c){const O=c[b],C=T.target.uuid;C in O&&(O[C].dispose(),delete O[C])}}}function nx(i,t){function e(){let P=!1;const tt=new Re;let J=null;const _t=new Re(0,0,0,0);return{setMask:function(ct){J!==ct&&!P&&(i.colorMask(ct,ct,ct,ct),J=ct)},setLocked:function(ct){P=ct},setClear:function(ct,ft,Ut,Jt,ot){ot===!0&&(ct*=Jt,ft*=Jt,Ut*=Jt),tt.set(ct,ft,Ut,Jt),_t.equals(tt)===!1&&(i.clearColor(ct,ft,Ut,Jt),_t.copy(tt))},reset:function(){P=!1,J=null,_t.set(-1,0,0,0)}}}function n(){let P=!1,tt=!1,J=null,_t=null,ct=null;return{setReversed:function(ft){if(tt!==ft){const Ut=t.get("EXT_clip_control");ft?Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.ZERO_TO_ONE_EXT):Ut.clipControlEXT(Ut.LOWER_LEFT_EXT,Ut.NEGATIVE_ONE_TO_ONE_EXT),tt=ft;const Jt=ct;ct=null,this.setClear(Jt)}},getReversed:function(){return tt},setTest:function(ft){ft?ht(i.DEPTH_TEST):Lt(i.DEPTH_TEST)},setMask:function(ft){J!==ft&&!P&&(i.depthMask(ft),J=ft)},setFunc:function(ft){if(tt&&(ft=Bd[ft]),_t!==ft){switch(ft){case xo:i.depthFunc(i.NEVER);break;case vo:i.depthFunc(i.ALWAYS);break;case yo:i.depthFunc(i.LESS);break;case Js:i.depthFunc(i.LEQUAL);break;case So:i.depthFunc(i.EQUAL);break;case Mo:i.depthFunc(i.GEQUAL);break;case bo:i.depthFunc(i.GREATER);break;case Eo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_t=ft}},setLocked:function(ft){P=ft},setClear:function(ft){ct!==ft&&(ct=ft,tt&&(ft=1-ft),i.clearDepth(ft))},reset:function(){P=!1,J=null,_t=null,ct=null,tt=!1}}}function s(){let P=!1,tt=null,J=null,_t=null,ct=null,ft=null,Ut=null,Jt=null,ot=null;return{setTest:function(Ot){P||(Ot?ht(i.STENCIL_TEST):Lt(i.STENCIL_TEST))},setMask:function(Ot){tt!==Ot&&!P&&(i.stencilMask(Ot),tt=Ot)},setFunc:function(Ot,$t,bt){(J!==Ot||_t!==$t||ct!==bt)&&(i.stencilFunc(Ot,$t,bt),J=Ot,_t=$t,ct=bt)},setOp:function(Ot,$t,bt){(ft!==Ot||Ut!==$t||Jt!==bt)&&(i.stencilOp(Ot,$t,bt),ft=Ot,Ut=$t,Jt=bt)},setLocked:function(Ot){P=Ot},setClear:function(Ot){ot!==Ot&&(i.clearStencil(Ot),ot=Ot)},reset:function(){P=!1,tt=null,J=null,_t=null,ct=null,ft=null,Ut=null,Jt=null,ot=null}}}const r=new e,a=new n,o=new s;let l={};const c=new WeakMap;let h={},f={},d={},u=new WeakMap,p=[],y=null,m=!1,g=null,v=null,E=null,S=null,R=null,T=null,_=null,b=new Kt(0,0,0),O=0,C=!1,L=null,z=null,$=null,I=null,W=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,rt=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(rt=parseFloat(/^WebGL (\d)/.exec(Y)[1]),G=rt>=1):Y.indexOf("OpenGL ES")!==-1&&(rt=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),G=rt>=2);let N=null,U={};const K=i.getParameter(i.SCISSOR_BOX),st=i.getParameter(i.VIEWPORT),k=new Re().fromArray(K),et=new Re().fromArray(st);function pt(P,tt,J,_t){const ct=new Uint8Array(4),ft=i.createTexture();i.bindTexture(P,ft),i.texParameteri(P,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(P,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ut=0;Ut<J;Ut++)P===i.TEXTURE_3D||P===i.TEXTURE_2D_ARRAY?i.texImage3D(tt,0,i.RGBA,1,1,_t,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(tt+Ut,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return ft}const Dt={};Dt[i.TEXTURE_2D]=pt(i.TEXTURE_2D,i.TEXTURE_2D,1),Dt[i.TEXTURE_CUBE_MAP]=pt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Dt[i.TEXTURE_2D_ARRAY]=pt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Dt[i.TEXTURE_3D]=pt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ht(i.DEPTH_TEST),a.setFunc(Js),Tt(!1),Mt(nc),ht(i.CULL_FACE),mt(fs);function ht(P){h[P]!==!0&&(i.enable(P),h[P]=!0)}function Lt(P){h[P]!==!1&&(i.disable(P),h[P]=!1)}function Se(P,tt){return d[P]!==tt?(i.bindFramebuffer(P,tt),d[P]=tt,P===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=tt),P===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=tt),!0):!1}function zt(P,tt){let J=p,_t=!1;if(P){J=u.get(tt),J===void 0&&(J=[],u.set(tt,J));const ct=P.textures;if(J.length!==ct.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ft=0,Ut=ct.length;ft<Ut;ft++)J[ft]=i.COLOR_ATTACHMENT0+ft;J.length=ct.length,_t=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,_t=!0);_t&&i.drawBuffers(J)}function Qt(P){return y!==P?(i.useProgram(P),y=P,!0):!1}const ee={[ds]:i.FUNC_ADD,[od]:i.FUNC_SUBTRACT,[ld]:i.FUNC_REVERSE_SUBTRACT};ee[cd]=i.MIN,ee[hd]=i.MAX;const it={[ud]:i.ZERO,[dd]:i.ONE,[fd]:i.SRC_COLOR,[Rh]:i.SRC_ALPHA,[vd]:i.SRC_ALPHA_SATURATE,[_d]:i.DST_COLOR,[md]:i.DST_ALPHA,[pd]:i.ONE_MINUS_SRC_COLOR,[Ch]:i.ONE_MINUS_SRC_ALPHA,[xd]:i.ONE_MINUS_DST_COLOR,[gd]:i.ONE_MINUS_DST_ALPHA,[yd]:i.CONSTANT_COLOR,[Sd]:i.ONE_MINUS_CONSTANT_COLOR,[Md]:i.CONSTANT_ALPHA,[bd]:i.ONE_MINUS_CONSTANT_ALPHA};function mt(P,tt,J,_t,ct,ft,Ut,Jt,ot,Ot){if(P===fs){m===!0&&(Lt(i.BLEND),m=!1);return}if(m===!1&&(ht(i.BLEND),m=!0),P!==ad){if(P!==g||Ot!==C){if((v!==ds||R!==ds)&&(i.blendEquation(i.FUNC_ADD),v=ds,R=ds),Ot)switch(P){case Ws:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ic:i.blendFunc(i.ONE,i.ONE);break;case sc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rc:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:oe("WebGLState: Invalid blending: ",P);break}else switch(P){case Ws:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ic:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case sc:oe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case rc:oe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:oe("WebGLState: Invalid blending: ",P);break}E=null,S=null,T=null,_=null,b.set(0,0,0),O=0,g=P,C=Ot}return}ct=ct||tt,ft=ft||J,Ut=Ut||_t,(tt!==v||ct!==R)&&(i.blendEquationSeparate(ee[tt],ee[ct]),v=tt,R=ct),(J!==E||_t!==S||ft!==T||Ut!==_)&&(i.blendFuncSeparate(it[J],it[_t],it[ft],it[Ut]),E=J,S=_t,T=ft,_=Ut),(Jt.equals(b)===!1||ot!==O)&&(i.blendColor(Jt.r,Jt.g,Jt.b,ot),b.copy(Jt),O=ot),g=P,C=!1}function ut(P,tt){P.side===nn?Lt(i.CULL_FACE):ht(i.CULL_FACE);let J=P.side===on;tt&&(J=!J),Tt(J),P.blending===Ws&&P.transparent===!1?mt(fs):mt(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),a.setFunc(P.depthFunc),a.setTest(P.depthTest),a.setMask(P.depthWrite),r.setMask(P.colorWrite);const _t=P.stencilWrite;o.setTest(_t),_t&&(o.setMask(P.stencilWriteMask),o.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),o.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),Nt(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?ht(i.SAMPLE_ALPHA_TO_COVERAGE):Lt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Tt(P){L!==P&&(P?i.frontFace(i.CW):i.frontFace(i.CCW),L=P)}function Mt(P){P!==id?(ht(i.CULL_FACE),P!==z&&(P===nc?i.cullFace(i.BACK):P===sd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Lt(i.CULL_FACE),z=P}function Vt(P){P!==$&&(G&&i.lineWidth(P),$=P)}function Nt(P,tt,J){P?(ht(i.POLYGON_OFFSET_FILL),(I!==tt||W!==J)&&(I=tt,W=J,a.getReversed()&&(tt=-tt,J=-J),i.polygonOffset(tt,J))):Lt(i.POLYGON_OFFSET_FILL)}function ne(P){P?ht(i.SCISSOR_TEST):Lt(i.SCISSOR_TEST)}function ie(P){P===void 0&&(P=i.TEXTURE0+Z-1),N!==P&&(i.activeTexture(P),N=P)}function ce(P,tt,J){J===void 0&&(N===null?J=i.TEXTURE0+Z-1:J=N);let _t=U[J];_t===void 0&&(_t={type:void 0,texture:void 0},U[J]=_t),(_t.type!==P||_t.texture!==tt)&&(N!==J&&(i.activeTexture(J),N=J),i.bindTexture(P,tt||Dt[P]),_t.type=P,_t.texture=tt)}function B(){const P=U[N];P!==void 0&&P.type!==void 0&&(i.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function Ce(){try{i.compressedTexImage2D(...arguments)}catch(P){oe("WebGLState:",P)}}function jt(){try{i.compressedTexImage3D(...arguments)}catch(P){oe("WebGLState:",P)}}function ge(){try{i.texSubImage2D(...arguments)}catch(P){oe("WebGLState:",P)}}function vt(){try{i.texSubImage3D(...arguments)}catch(P){oe("WebGLState:",P)}}function we(){try{i.compressedTexSubImage2D(...arguments)}catch(P){oe("WebGLState:",P)}}function Bt(){try{i.compressedTexSubImage3D(...arguments)}catch(P){oe("WebGLState:",P)}}function Gt(){try{i.texStorage2D(...arguments)}catch(P){oe("WebGLState:",P)}}function w(){try{i.texStorage3D(...arguments)}catch(P){oe("WebGLState:",P)}}function x(){try{i.texImage2D(...arguments)}catch(P){oe("WebGLState:",P)}}function V(){try{i.texImage3D(...arguments)}catch(P){oe("WebGLState:",P)}}function at(P){return f[P]!==void 0?f[P]:i.getParameter(P)}function nt(P,tt){f[P]!==tt&&(i.pixelStorei(P,tt),f[P]=tt)}function dt(P){k.equals(P)===!1&&(i.scissor(P.x,P.y,P.z,P.w),k.copy(P))}function yt(P){et.equals(P)===!1&&(i.viewport(P.x,P.y,P.z,P.w),et.copy(P))}function Q(P,tt){let J=c.get(tt);J===void 0&&(J=new WeakMap,c.set(tt,J));let _t=J.get(P);_t===void 0&&(_t=i.getUniformBlockIndex(tt,P.name),i.uniformBlockBinding(tt,_t,_t),J.set(P,_t))}function j(P,tt,J){const ct=c.get(tt).get(P);l[ct]!==J&&(i.bindBufferBase(i.UNIFORM_BUFFER,ct,J),l[ct]=J)}function gt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),h={},f={},N=null,U={},d={},l={},u=new WeakMap,p=[],y=null,m=!1,g=null,v=null,E=null,S=null,R=null,T=null,_=null,b=new Kt(0,0,0),O=0,C=!1,L=null,z=null,$=null,I=null,W=null,k.set(0,0,i.canvas.width,i.canvas.height),et.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ht,disable:Lt,bindFramebuffer:Se,drawBuffers:zt,useProgram:Qt,setBlending:mt,setMaterial:ut,setFlipSided:Tt,setCullFace:Mt,setLineWidth:Vt,setPolygonOffset:Nt,setScissorTest:ne,activeTexture:ie,bindTexture:ce,unbindTexture:B,compressedTexImage2D:Ce,compressedTexImage3D:jt,texImage2D:x,texImage3D:V,pixelStorei:nt,getParameter:at,updateUBOMapping:Q,uniformBlockBinding:j,texStorage2D:Gt,texStorage3D:w,texSubImage2D:ge,texSubImage3D:vt,compressedTexSubImage2D:we,compressedTexSubImage3D:Bt,scissor:dt,viewport:yt,reset:gt}}function ix(i,t,e,n,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new lt,h=new WeakMap,f=new Set;let d;const u=new WeakMap,p=new Set,y=new FinalizationRegistry(w=>p.delete(w));let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,x){return m?new OffscreenCanvas(w,x):ra("canvas")}function v(w,x,V){let at=1;const nt=Gt(w);if((nt.width>V||nt.height>V)&&(at=V/Math.max(nt.width,nt.height)),at<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const dt=Math.floor(at*nt.width),yt=Math.floor(at*nt.height);d===void 0&&(d=g(dt,yt));const Q=x?g(dt,yt):d;return Q.width=dt,Q.height=yt,Q.getContext("2d").drawImage(w,0,0,dt,yt),kt("WebGLRenderer: Texture has been resized from ("+nt.width+"x"+nt.height+") to ("+dt+"x"+yt+")."),Q}else return"data"in w&&kt("WebGLRenderer: Image in DataTexture is too big ("+nt.width+"x"+nt.height+")."),w;return w}function E(w){return w.generateMipmaps}function S(w){i.generateMipmap(w)}function R(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(w,x,V,at,nt,dt=!1){if(w!==null){if(i[w]!==void 0)return i[w];kt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let yt;at&&(yt=t.get("EXT_texture_norm16"),yt||kt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=x;if(x===i.RED&&(V===i.FLOAT&&(Q=i.R32F),V===i.HALF_FLOAT&&(Q=i.R16F),V===i.UNSIGNED_BYTE&&(Q=i.R8),V===i.UNSIGNED_SHORT&&yt&&(Q=yt.R16_EXT),V===i.SHORT&&yt&&(Q=yt.R16_SNORM_EXT)),x===i.RED_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.R8UI),V===i.UNSIGNED_SHORT&&(Q=i.R16UI),V===i.UNSIGNED_INT&&(Q=i.R32UI),V===i.BYTE&&(Q=i.R8I),V===i.SHORT&&(Q=i.R16I),V===i.INT&&(Q=i.R32I)),x===i.RG&&(V===i.FLOAT&&(Q=i.RG32F),V===i.HALF_FLOAT&&(Q=i.RG16F),V===i.UNSIGNED_BYTE&&(Q=i.RG8),V===i.UNSIGNED_SHORT&&yt&&(Q=yt.RG16_EXT),V===i.SHORT&&yt&&(Q=yt.RG16_SNORM_EXT)),x===i.RG_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RG8UI),V===i.UNSIGNED_SHORT&&(Q=i.RG16UI),V===i.UNSIGNED_INT&&(Q=i.RG32UI),V===i.BYTE&&(Q=i.RG8I),V===i.SHORT&&(Q=i.RG16I),V===i.INT&&(Q=i.RG32I)),x===i.RGB_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),V===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),V===i.UNSIGNED_INT&&(Q=i.RGB32UI),V===i.BYTE&&(Q=i.RGB8I),V===i.SHORT&&(Q=i.RGB16I),V===i.INT&&(Q=i.RGB32I)),x===i.RGBA_INTEGER&&(V===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),V===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),V===i.UNSIGNED_INT&&(Q=i.RGBA32UI),V===i.BYTE&&(Q=i.RGBA8I),V===i.SHORT&&(Q=i.RGBA16I),V===i.INT&&(Q=i.RGBA32I)),x===i.RGB&&(V===i.UNSIGNED_SHORT&&yt&&(Q=yt.RGB16_EXT),V===i.SHORT&&yt&&(Q=yt.RGB16_SNORM_EXT),V===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),V===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),x===i.RGBA){const j=dt?sa:ae.getTransfer(nt);V===i.FLOAT&&(Q=i.RGBA32F),V===i.HALF_FLOAT&&(Q=i.RGBA16F),V===i.UNSIGNED_BYTE&&(Q=j===me?i.SRGB8_ALPHA8:i.RGBA8),V===i.UNSIGNED_SHORT&&yt&&(Q=yt.RGBA16_EXT),V===i.SHORT&&yt&&(Q=yt.RGBA16_SNORM_EXT),V===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),V===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function _(w,x){let V;return w?x===null||x===Gn||x===_s?V=i.DEPTH24_STENCIL8:x===wn?V=i.DEPTH32F_STENCIL8:x===Ks&&(V=i.DEPTH24_STENCIL8,kt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===Gn||x===_s?V=i.DEPTH_COMPONENT24:x===wn?V=i.DEPTH_COMPONENT32F:x===Ks&&(V=i.DEPTH_COMPONENT16),V}function b(w,x){return E(w)===!0||w.isFramebufferTexture&&w.minFilter!==We&&w.minFilter!==sn?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function O(w){const x=new WeakRef(w);n.get(w).__ref=x,p.add(x),y.register(w,x,x)}function C(w){const x=n.get(w).__ref;x!==void 0&&(p.delete(x),y.unregister(x))}function L(w){$(w.target)}function z(w){I(w.target)}function $(w){w.removeEventListener("dispose",L),C(w),Z(w),w.isVideoTexture&&h.delete(w),w.isHTMLTexture&&f.delete(w)}function I(w){w.removeEventListener("dispose",z),C(w),rt(w)}function W(){for(const w of p){const x=w.deref();x!==void 0&&(x.isRenderTarget===!0?I(x):$(x))}p.clear(),f.clear()}function Z(w){const x=n.get(w);if(x.__webglInit===void 0)return;const V=w.source,at=u.get(V);if(at){const nt=at[x.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&G(w),Object.keys(at).length===0&&u.delete(V)}n.remove(w)}function G(w){const x=n.get(w);i.deleteTexture(x.__webglTexture);const V=w.source,at=u.get(V);delete at[x.__cacheKey],a.memory.textures--}function rt(w){const x=n.get(w);x.__depthDisposeCallback&&x.__depthDisposeCallback();const V=w.depthTexture;if(V&&V.renderTarget===w&&$(V),w.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(x.__webglFramebuffer[nt]))for(let dt=0;dt<x.__webglFramebuffer[nt].length;dt++)i.deleteFramebuffer(x.__webglFramebuffer[nt][dt]);else i.deleteFramebuffer(x.__webglFramebuffer[nt]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[nt])}else{if(Array.isArray(x.__webglFramebuffer))for(let nt=0;nt<x.__webglFramebuffer.length;nt++)i.deleteFramebuffer(x.__webglFramebuffer[nt]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let nt=0;nt<x.__webglColorRenderbuffer.length;nt++)x.__webglColorRenderbuffer[nt]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[nt]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const at=w.textures;for(let nt=0,dt=at.length;nt<dt;nt++){const yt=n.get(at[nt]);yt.__webglTexture&&(i.deleteTexture(yt.__webglTexture),a.memory.textures--),n.remove(at[nt])}n.remove(w)}let Y=0;function N(){Y=0}function U(){return Y}function K(w){Y=w}function st(){const w=Y;return w>=s.maxTextures&&kt("WebGLTextures: Trying to use "+(w+1)+" texture units while this GPU supports only "+s.maxTextures),Y+=1,w}function k(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.mipmapsAutoUpdate),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function et(w,x){const V=n.get(w);if(w.isVideoTexture&&we(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&V.__version!==w.version){const at=w.image;if(at===null)kt("WebGLRenderer: Texture marked for update but no image data found.");else if(at.complete===!1)kt("WebGLRenderer: Texture marked for update but image is incomplete");else{ut(V,w,x);return}}else w.isExternalTexture&&(V.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,V.__webglTexture,i.TEXTURE0+x)}function pt(w,x){const V=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&V.__version!==w.version){ut(V,w,x);return}else w.isExternalTexture&&(V.__webglTexture=w.sourceTexture?w.sourceTexture:null);e.bindTexture(i.TEXTURE_2D_ARRAY,V.__webglTexture,i.TEXTURE0+x)}function Dt(w,x){const V=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&V.__version!==w.version){ut(V,w,x);return}e.bindTexture(i.TEXTURE_3D,V.__webglTexture,i.TEXTURE0+x)}function ht(w,x){const V=n.get(w);if(w.version>0&&V.__version!==w.version){Tt(V,w,x);return}e.bindTexture(i.TEXTURE_CUBE_MAP,V.__webglTexture,i.TEXTURE0+x)}const Lt={[wo]:i.REPEAT,[ti]:i.CLAMP_TO_EDGE,[To]:i.MIRRORED_REPEAT},Se={[We]:i.NEAREST,[Td]:i.NEAREST_MIPMAP_NEAREST,[dr]:i.NEAREST_MIPMAP_LINEAR,[sn]:i.LINEAR,[Ra]:i.LINEAR_MIPMAP_NEAREST,[ei]:i.LINEAR_MIPMAP_LINEAR},zt={[Pd]:i.NEVER,[$h]:i.ALWAYS,[Ld]:i.LESS,[Xh]:i.LEQUAL,[Id]:i.EQUAL,[qh]:i.GEQUAL,[Dd]:i.GREATER,[Nd]:i.NOTEQUAL};function Qt(w,x){if(x.type===wn&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===sn||x.magFilter===Ra||x.magFilter===dr||x.magFilter===ei||x.minFilter===sn||x.minFilter===Ra||x.minFilter===dr||x.minFilter===ei)&&kt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,Lt[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Lt[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Lt[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,Se[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,Se[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,zt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===We||x.minFilter!==dr&&x.minFilter!==ei||x.type===wn&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const V=t.get("EXT_texture_filter_anisotropic");i.texParameterf(w,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,s.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function ee(w,x){let V=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",L),O(x));const at=x.source;let nt=u.get(at);nt===void 0&&(nt={},u.set(at,nt));const dt=k(x);if(dt!==w.__cacheKey){nt[dt]===void 0&&(nt[dt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,V=!0),nt[dt].usedTimes++;const yt=nt[w.__cacheKey];yt!==void 0&&(nt[w.__cacheKey].usedTimes--,yt.usedTimes===0&&G(x)),w.__cacheKey=dt,w.__webglTexture=nt[dt].texture}return V}function it(w,x,V){return Math.floor(Math.floor(w/V)/x)}function mt(w,x,V,at){const dt=w.updateRanges;if(dt.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,V,at,x.data);else{dt.sort((P,tt)=>P.start-tt.start);let yt=0;for(let P=1;P<dt.length;P++){const tt=dt[yt],J=dt[P],_t=tt.start+tt.count,ct=it(J.start,x.width,4),ft=it(tt.start,x.width,4);J.start<=_t+1&&ct===ft&&it(J.start+J.count-1,x.width,4)===ct?tt.count=Math.max(tt.count,J.start+J.count-tt.start):(++yt,dt[yt]=J)}dt.length=yt+1;const Q=e.getParameter(i.UNPACK_ROW_LENGTH),j=e.getParameter(i.UNPACK_SKIP_PIXELS),gt=e.getParameter(i.UNPACK_SKIP_ROWS);e.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let P=0,tt=dt.length;P<tt;P++){const J=dt[P],_t=Math.floor(J.start/4),ct=Math.ceil(J.count/4),ft=_t%x.width,Ut=Math.floor(_t/x.width),Jt=ct,ot=1;e.pixelStorei(i.UNPACK_SKIP_PIXELS,ft),e.pixelStorei(i.UNPACK_SKIP_ROWS,Ut),e.texSubImage2D(i.TEXTURE_2D,0,ft,Ut,Jt,ot,V,at,x.data)}w.clearUpdateRanges(),e.pixelStorei(i.UNPACK_ROW_LENGTH,Q),e.pixelStorei(i.UNPACK_SKIP_PIXELS,j),e.pixelStorei(i.UNPACK_SKIP_ROWS,gt)}}function ut(w,x,V){let at=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(at=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(at=i.TEXTURE_3D);const nt=ee(w,x),dt=x.source;e.bindTexture(at,w.__webglTexture,i.TEXTURE0+V);const yt=n.get(dt);if(dt.version!==yt.__version||nt===!0){if(e.activeTexture(i.TEXTURE0+V),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const ot=ae.getPrimaries(ae.workingColorSpace),Ot=x.colorSpace===vi?null:ae.getPrimaries(x.colorSpace),$t=x.colorSpace===vi||ot===Ot?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t)}e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment);let j=v(x.image,!1,s.maxTextureSize);j=Bt(x,j);const gt=r.convert(x.format,x.colorSpace),P=r.convert(x.type);let tt=T(x.internalFormat,gt,P,x.normalized,x.colorSpace,x.isVideoTexture);Qt(at,x);let J;const _t=x.mipmaps,ct=x.isVideoTexture!==!0,ft=yt.__version===void 0||nt===!0,Ut=dt.dataReady,Jt=b(x,j);if(x.isDepthTexture)tt=_(x.format===yi,x.type),ft&&(ct?e.texStorage2D(i.TEXTURE_2D,1,tt,j.width,j.height):e.texImage2D(i.TEXTURE_2D,0,tt,j.width,j.height,0,gt,P,null));else if(x.isDataTexture)if(_t.length>0){ct&&ft&&e.texStorage2D(i.TEXTURE_2D,Jt,tt,_t[0].width,_t[0].height);for(let ot=0,Ot=_t.length;ot<Ot;ot++)J=_t[ot],ct?Ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,J.width,J.height,gt,P,J.data):e.texImage2D(i.TEXTURE_2D,ot,tt,J.width,J.height,0,gt,P,J.data);x.generateMipmaps=!1}else ct?(ft&&e.texStorage2D(i.TEXTURE_2D,Jt,tt,j.width,j.height),Ut&&mt(x,j,gt,P)):e.texImage2D(i.TEXTURE_2D,0,tt,j.width,j.height,0,gt,P,j.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){ct&&ft&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Jt,tt,_t[0].width,_t[0].height,j.depth);for(let ot=0,Ot=_t.length;ot<Ot;ot++)if(J=_t[ot],x.format!==zn)if(gt!==null)if(ct){if(Ut)if(x.layerUpdates.size>0){const $t=Yc(J.width,J.height,x.format,x.type);for(const bt of x.layerUpdates){const pe=J.data.subarray(bt*$t/J.data.BYTES_PER_ELEMENT,(bt+1)*$t/J.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,bt,J.width,J.height,1,gt,pe)}}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,J.width,J.height,j.depth,gt,J.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ot,tt,J.width,J.height,j.depth,0,J.data,0,0);else kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ct?Ut&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,J.width,J.height,j.depth,gt,P,J.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ot,tt,J.width,J.height,j.depth,0,gt,P,J.data);x.layerUpdates.size>0&&x.clearLayerUpdates()}else{ct&&ft&&e.texStorage2D(i.TEXTURE_2D,Jt,tt,_t[0].width,_t[0].height);for(let ot=0,Ot=_t.length;ot<Ot;ot++)J=_t[ot],x.format!==zn?gt!==null?ct?Ut&&e.compressedTexSubImage2D(i.TEXTURE_2D,ot,0,0,J.width,J.height,gt,J.data):e.compressedTexImage2D(i.TEXTURE_2D,ot,tt,J.width,J.height,0,J.data):kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ct?Ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,J.width,J.height,gt,P,J.data):e.texImage2D(i.TEXTURE_2D,ot,tt,J.width,J.height,0,gt,P,J.data)}else if(x.isDataArrayTexture)if(ct){if(ft&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Jt,tt,j.width,j.height,j.depth),Ut)if(x.layerUpdates.size>0){const ot=Yc(j.width,j.height,x.format,x.type);for(const Ot of x.layerUpdates){const $t=j.data.subarray(Ot*ot/j.data.BYTES_PER_ELEMENT,(Ot+1)*ot/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ot,j.width,j.height,1,gt,P,$t)}x.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,gt,P,j.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,tt,j.width,j.height,j.depth,0,gt,P,j.data);else if(x.isData3DTexture)ct?(ft&&e.texStorage3D(i.TEXTURE_3D,Jt,tt,j.width,j.height,j.depth),Ut&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,gt,P,j.data)):e.texImage3D(i.TEXTURE_3D,0,tt,j.width,j.height,j.depth,0,gt,P,j.data);else if(x.isFramebufferTexture){if(ft)if(ct)e.texStorage2D(i.TEXTURE_2D,Jt,tt,j.width,j.height);else{let ot=j.width,Ot=j.height;for(let $t=0;$t<Jt;$t++)e.texImage2D(i.TEXTURE_2D,$t,tt,ot,Ot,0,gt,P,null),ot>>=1,Ot>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in i){const ot=i.canvas;if(ot.hasAttribute("layoutsubtree")||ot.setAttribute("layoutsubtree","true"),j.parentNode!==ot){ot.appendChild(j),f.add(x),ot.onpaint=Ot=>{const $t=Ot.changedElements;for(const bt of f)$t.includes(bt.image)&&(bt.needsUpdate=!0)},ot.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,j);else{const $t=i.RGBA,bt=i.RGBA,pe=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,$t,bt,pe,j)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(_t.length>0){if(ct&&ft){const ot=Gt(_t[0]);e.texStorage2D(i.TEXTURE_2D,Jt,tt,ot.width,ot.height)}for(let ot=0,Ot=_t.length;ot<Ot;ot++)J=_t[ot],ct?Ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,gt,P,J):e.texImage2D(i.TEXTURE_2D,ot,tt,gt,P,J);x.generateMipmaps=!1}else if(ct){if(ft){const ot=Gt(j);e.texStorage2D(i.TEXTURE_2D,Jt,tt,ot.width,ot.height)}Ut&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,P,j)}else e.texImage2D(i.TEXTURE_2D,0,tt,gt,P,j);E(x)&&x.mipmapsAutoUpdate===!0&&S(at),yt.__version=dt.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Tt(w,x,V){if(x.image.length!==6)return;const at=ee(w,x),nt=x.source;e.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+V);const dt=n.get(nt);if(nt.version!==dt.__version||at===!0){e.activeTexture(i.TEXTURE0+V);const yt=ae.getPrimaries(ae.workingColorSpace),Q=x.colorSpace===vi?null:ae.getPrimaries(x.colorSpace),j=x.colorSpace===vi||yt===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;e.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),e.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),e.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),e.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const gt=x.isCompressedTexture||x.image[0].isCompressedTexture,P=x.image[0]&&x.image[0].isDataTexture,tt=[];for(let bt=0;bt<6;bt++)!gt&&!P?tt[bt]=v(x.image[bt],!0,s.maxCubemapSize):tt[bt]=P?x.image[bt].image:x.image[bt],tt[bt]=Bt(x,tt[bt]);const J=tt[0],_t=r.convert(x.format,x.colorSpace),ct=r.convert(x.type);let ft=T(x.internalFormat,_t,ct,x.normalized,x.colorSpace);const Ut=x.isVideoTexture!==!0,Jt=dt.__version===void 0||at===!0,ot=nt.dataReady;let Ot=b(x,J);Qt(i.TEXTURE_CUBE_MAP,x);let $t;if(x.isDepthTexture){if(ft=_(x.format===yi,x.type),Jt)if(Ut)e.texStorage2D(i.TEXTURE_CUBE_MAP,1,ft,J.width,J.height);else for(let bt=0;bt<6;bt++)e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,ft,J.width,J.height,0,_t,ct,null)}else if(gt){Ut&&Jt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Ot,ft,J.width,J.height);for(let bt=0;bt<6;bt++){$t=tt[bt].mipmaps;for(let pe=0;pe<$t.length;pe++){const Fe=$t[pe];x.format!==zn?_t!==null?Ut?ot&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,pe,0,0,Fe.width,Fe.height,_t,Fe.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,pe,ft,Fe.width,Fe.height,0,Fe.data):kt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,pe,0,0,Fe.width,Fe.height,_t,ct,Fe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,pe,ft,Fe.width,Fe.height,0,_t,ct,Fe.data)}}}else{if($t=x.mipmaps,Ut&&Jt){$t.length>0&&Ot++;const bt=Gt(tt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Ot,ft,bt.width,bt.height)}for(let bt=0;bt<6;bt++)if(P){Ut?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,tt[bt].width,tt[bt].height,_t,ct,tt[bt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,ft,tt[bt].width,tt[bt].height,0,_t,ct,tt[bt].data);for(let pe=0;pe<$t.length;pe++){const li=$t[pe].image[bt].image;Ut?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,pe+1,0,0,li.width,li.height,_t,ct,li.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,pe+1,ft,li.width,li.height,0,_t,ct,li.data)}}else{Ut?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,_t,ct,tt[bt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,ft,_t,ct,tt[bt]);for(let pe=0;pe<$t.length;pe++){const Fe=$t[pe];Ut?ot&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,pe+1,0,0,_t,ct,Fe.image[bt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+bt,pe+1,ft,_t,ct,Fe.image[bt])}}}E(x)&&x.mipmapsAutoUpdate===!0&&S(i.TEXTURE_CUBE_MAP),dt.__version=nt.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function Mt(w,x,V,at,nt,dt){const yt=r.convert(V.format,V.colorSpace),Q=r.convert(V.type),j=T(V.internalFormat,yt,Q,V.normalized,V.colorSpace),gt=n.get(x),P=n.get(V);if(P.__renderTarget=x,!gt.__hasExternalTextures){const tt=Math.max(1,x.width>>dt),J=Math.max(1,x.height>>dt);nt===i.TEXTURE_3D||nt===i.TEXTURE_2D_ARRAY?e.texImage3D(nt,dt,j,tt,J,x.depth,0,yt,Q,null):e.texImage2D(nt,dt,j,tt,J,0,yt,Q,null)}e.bindFramebuffer(i.FRAMEBUFFER,w),vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,at,nt,P.__webglTexture,0,ge(x)):(nt===i.TEXTURE_2D||nt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,at,nt,P.__webglTexture,dt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Vt(w,x,V){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){const at=x.depthTexture,nt=at&&at.isDepthTexture?at.type:null,dt=_(x.stencilBuffer,nt),yt=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;vt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(x),dt,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(x),dt,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,dt,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,yt,i.RENDERBUFFER,w)}else{const at=x.textures;for(let nt=0;nt<at.length;nt++){const dt=at[nt],yt=r.convert(dt.format,dt.colorSpace),Q=r.convert(dt.type),j=T(dt.internalFormat,yt,Q,dt.normalized,dt.colorSpace);vt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ge(x),j,x.width,x.height):V?i.renderbufferStorageMultisample(i.RENDERBUFFER,ge(x),j,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,j,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Nt(w,x,V){const at=x.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const nt=n.get(x.depthTexture);nt.__renderTarget=x;const dt=at?x.depthTexture.image[0]:x.depthTexture.image;(!nt.__webglTexture||dt.width!==x.width||dt.height!==x.height)&&(dt.width=x.width,dt.height=x.height,x.depthTexture.needsUpdate=!0),at?ht(x.depthTexture,0):et(x.depthTexture,0);const yt=nt.__webglTexture,Q=ge(x),j=at?i.TEXTURE_CUBE_MAP_POSITIVE_X+V:i.TEXTURE_2D,gt=x.depthTexture.format===yi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Ei)vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,gt,j,yt,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,gt,j,yt,0);else if(x.depthTexture.format===yi)vt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,gt,j,yt,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,gt,j,yt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ne(w){const x=n.get(w),V=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const at=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),at){const nt=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,at.removeEventListener("dispose",nt)};at.addEventListener("dispose",nt),x.__depthDisposeCallback=nt}x.__boundDepthTexture=at}if(w.depthTexture&&!x.__autoAllocateDepthBuffer)if(V)for(let at=0;at<6;at++)Nt(x.__webglFramebuffer[at],w,at);else w.texture.mipmaps.length>0?Nt(x.__webglFramebuffer[0],w,0):Nt(x.__webglFramebuffer,w,0);else if(V){x.__webglDepthbuffer=[];for(let at=0;at<6;at++)if(e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[at]),x.__webglDepthbuffer[at]===void 0)x.__webglDepthbuffer[at]=i.createRenderbuffer(),Vt(x.__webglDepthbuffer[at],w,!1);else{const nt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=x.__webglDepthbuffer[at];i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,dt)}}else if(w.texture.mipmaps.length>0?e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Vt(x.__webglDepthbuffer,w,!1);else{const nt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,dt),i.framebufferRenderbuffer(i.FRAMEBUFFER,nt,i.RENDERBUFFER,dt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function ie(w,x,V){const at=n.get(w);x!==void 0&&Mt(at.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),V!==void 0&&ne(w)}function ce(w){const x=w.texture,V=n.get(w),at=n.get(x);w.addEventListener("dispose",z),O(w);const nt=w.textures,dt=w.isWebGLCubeRenderTarget===!0,yt=nt.length>1;if(yt||(at.__webglTexture===void 0&&(at.__webglTexture=i.createTexture()),at.__version=x.version,a.memory.textures++),dt){V.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(x.mipmaps.length>0){V.__webglFramebuffer[Q]=[];for(let j=0;j<x.mipmaps.length;j++)V.__webglFramebuffer[Q][j]=i.createFramebuffer()}else V.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(x.mipmaps.length>0){V.__webglFramebuffer=[];for(let Q=0;Q<x.mipmaps.length;Q++)V.__webglFramebuffer[Q]=i.createFramebuffer()}else V.__webglFramebuffer=i.createFramebuffer();if(yt)for(let Q=0,j=nt.length;Q<j;Q++){const gt=n.get(nt[Q]);gt.__webglTexture===void 0&&(gt.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&vt(w)===!1){V.__webglMultisampledFramebuffer=i.createFramebuffer(),V.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Q=0;Q<nt.length;Q++){const j=nt[Q];V.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,V.__webglColorRenderbuffer[Q]);const gt=r.convert(j.format,j.colorSpace),P=r.convert(j.type),tt=T(j.internalFormat,gt,P,j.normalized,j.colorSpace,w.isXRRenderTarget===!0),J=ge(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,J,tt,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,V.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(V.__webglDepthRenderbuffer=i.createRenderbuffer(),Vt(V.__webglDepthRenderbuffer,w,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(dt){e.bindTexture(i.TEXTURE_CUBE_MAP,at.__webglTexture),Qt(i.TEXTURE_CUBE_MAP,x);for(let Q=0;Q<6;Q++)if(x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)Mt(V.__webglFramebuffer[Q][j],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,j);else Mt(V.__webglFramebuffer[Q],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);E(x)?S(i.TEXTURE_CUBE_MAP):x.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),e.unbindTexture()}else if(yt){for(let Q=0,j=nt.length;Q<j;Q++){const gt=nt[Q],P=n.get(gt);let tt=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(tt=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(tt,P.__webglTexture),Qt(tt,gt),Mt(V.__webglFramebuffer,w,gt,i.COLOR_ATTACHMENT0+Q,tt,0),E(gt)&&S(tt)}e.unbindTexture()}else{let Q=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(Q=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Q,at.__webglTexture),Qt(Q,x),x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)Mt(V.__webglFramebuffer[j],w,x,i.COLOR_ATTACHMENT0,Q,j);else Mt(V.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,Q,0);E(x)?S(Q):x.mipmaps.length>0&&i.texParameteri(Q,i.TEXTURE_MAX_LEVEL,x.mipmaps.length-1),e.unbindTexture()}w.depthBuffer&&ne(w)}function B(w){const x=w.textures;for(let V=0,at=x.length;V<at;V++){const nt=x[V];if(E(nt)&&nt.mipmapsAutoUpdate===!0){const dt=R(w),yt=n.get(nt).__webglTexture;e.bindTexture(dt,yt),S(dt),e.unbindTexture()}}}const Ce=[];function jt(w){if(w.samples>0){if(vt(w)===!1){const x=w.textures,V=w.width,at=w.height;let nt=i.COLOR_BUFFER_BIT;const dt=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=n.get(w),Q=x.length>1;if(Q)for(let gt=0;gt<x.length;gt++)e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),w.texture.mipmaps.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let gt=0;gt<x.length;gt++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(nt|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(nt|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,yt.__webglColorRenderbuffer[gt]);const P=n.get(x[gt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,P,0)}i.blitFramebuffer(0,0,V,at,0,0,V,at,nt,i.NEAREST),l===!0&&(Ce.length=0,Ce.push(i.COLOR_ATTACHMENT0+gt),w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&Ce.push(dt),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ce))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let gt=0;gt<x.length;gt++){e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.RENDERBUFFER,yt.__webglColorRenderbuffer[gt]);const P=n.get(x[gt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+gt,i.TEXTURE_2D,P,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.storeMultisampledDepthBuffer===!1&&l){const x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function ge(w){return Math.min(s.maxSamples,w.samples)}function vt(w){const x=n.get(w);return w.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function we(w){const x=a.render.frame;h.get(w)!==x&&(h.set(w,x),w.update())}function Bt(w,x){const V=w.colorSpace,at=w.format,nt=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||V!==ia&&V!==vi&&(ae.getTransfer(V)===me?(at!==zn||nt!==hn)&&kt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):oe("WebGLTextures: Unsupported texture color space:",V)),x}function Gt(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=st,this.resetTextureUnits=N,this.getTextureUnits=U,this.setTextureUnits=K,this.setTexture2D=et,this.setTexture2DArray=pt,this.setTexture3D=Dt,this.setTextureCube=ht,this.rebindTextures=ie,this.setupRenderTarget=ce,this.updateRenderTargetMipmap=B,this.updateMultisampleRenderTarget=jt,this.setupDepthRenderbuffer=ne,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=vt,this.dispose=W}function sx(i,t){function e(n,s=vi){let r;const a=ae.getTransfer(s);if(n===hn)return i.UNSIGNED_BYTE;if(n===vl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===yl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Gh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Hh)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===zh)return i.BYTE;if(n===kh)return i.SHORT;if(n===Ks)return i.UNSIGNED_SHORT;if(n===xl)return i.INT;if(n===Gn)return i.UNSIGNED_INT;if(n===wn)return i.FLOAT;if(n===Hn)return i.HALF_FLOAT;if(n===Vh)return i.ALPHA;if(n===Wh)return i.RGB;if(n===zn)return i.RGBA;if(n===Ei)return i.DEPTH_COMPONENT;if(n===yi)return i.DEPTH_STENCIL;if(n===Sl)return i.RED;if(n===Ml)return i.RED_INTEGER;if(n===Hi)return i.RG;if(n===bl)return i.RG_INTEGER;if(n===El)return i.RGBA_INTEGER;if(n===qr||n===$r||n===Yr||n===Jr)if(a===me)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===qr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===qr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===$r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Yr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Jr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ao||n===Ro||n===Co||n===Po)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ao)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ro)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Co)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Po)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Lo||n===Io||n===Do||n===No||n===Uo||n===ea||n===Fo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Lo||n===Io)return a===me?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Do)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===No)return r.COMPRESSED_R11_EAC;if(n===Uo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ea)return r.COMPRESSED_RG11_EAC;if(n===Fo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Oo||n===Bo||n===zo||n===ko||n===Go||n===Ho||n===Vo||n===Wo||n===Xo||n===qo||n===$o||n===Yo||n===Jo||n===Zo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Oo)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Bo)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===zo)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ko)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Go)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ho)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Vo)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Wo)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xo)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===qo)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$o)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Yo)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Jo)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Zo)return a===me?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ko||n===Qo||n===jo)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ko)return a===me?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Qo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===tl||n===el||n===na||n===nl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===tl)return r.COMPRESSED_RED_RGTC1_EXT;if(n===el)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===na)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_s?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const rx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ax=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class ox{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new ou(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Ai({vertexShader:rx,fragmentShader:ax,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new qt(new Ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class lx extends Xi{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,d=null,u=null,p=null;const y=typeof XRWebGLBinding<"u",m=new ox,g={},v=e.getContextAttributes();let E=null,S=null;const R=[],T=[],_=new lt;let b=null,O=null;const C=new En;C.viewport=new Re;const L=new En;L.viewport=new Re;const z=[C,L],$=new vp;let I=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(k){let et=R[k];return et===void 0&&(et=new Ua,R[k]=et),et.getTargetRaySpace()},this.getControllerGrip=function(k){let et=R[k];return et===void 0&&(et=new Ua,R[k]=et),et.getGripSpace()},this.getHand=function(k){let et=R[k];return et===void 0&&(et=new Ua,R[k]=et),et.getHandSpace()};function Z(k){const et=T.indexOf(k.inputSource);if(et===-1)return;const pt=R[et];pt!==void 0&&(pt.update(k.inputSource,k.frame,c||a),pt.dispatchEvent({type:k.type,data:k.inputSource}))}function G(){s.removeEventListener("select",Z),s.removeEventListener("selectstart",Z),s.removeEventListener("selectend",Z),s.removeEventListener("squeeze",Z),s.removeEventListener("squeezestart",Z),s.removeEventListener("squeezeend",Z),s.removeEventListener("end",G),s.removeEventListener("inputsourceschange",rt);for(let k=0;k<R.length;k++){const et=T[k];et!==null&&(T[k]=null,R[k].disconnect(et))}I=null,W=null,m.reset();for(const k in g)delete g[k];if(t.setRenderTarget(E),u=null,d=null,f=null,s=null,S=null,st.stop(),n.isPresenting=!1,t.setPixelRatio(b),t.setSize(_.width,_.height,!1),O!==null){const k=O.camera;k.fov=O.fov,k.zoom=O.zoom,k.updateProjectionMatrix(),O=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(k){r=k,n.isPresenting===!0&&kt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(k){o=k,n.isPresenting===!0&&kt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(k){c=k},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(s,e)),f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(k){if(s=k,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",Z),s.addEventListener("selectstart",Z),s.addEventListener("selectend",Z),s.addEventListener("squeeze",Z),s.addEventListener("squeezestart",Z),s.addEventListener("squeezeend",Z),s.addEventListener("end",G),s.addEventListener("inputsourceschange",rt),v.xrCompatible!==!0&&await e.makeXRCompatible(),b=t.getPixelRatio(),t.getSize(_),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pt=null,Dt=null,ht=null;v.depth&&(ht=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,pt=v.stencil?yi:Ei,Dt=v.stencil?_s:Gn);const Lt={colorFormat:e.RGBA8,depthFormat:ht,scaleFactor:r};f=this.getBinding(),d=f.createProjectionLayer(Lt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),S=new kn(d.textureWidth,d.textureHeight,{format:zn,type:hn,depthTexture:new xs(d.textureWidth,d.textureHeight,Dt,void 0,void 0,void 0,void 0,void 0,void 0,pt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const pt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};u=new XRWebGLLayer(s,e,pt),s.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),S=new kn(u.framebufferWidth,u.framebufferHeight,{format:zn,type:hn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),st.setContext(s),st.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function rt(k){for(let et=0;et<k.removed.length;et++){const pt=k.removed[et],Dt=T.indexOf(pt);Dt>=0&&(T[Dt]=null,R[Dt].disconnect(pt))}for(let et=0;et<k.added.length;et++){const pt=k.added[et];let Dt=T.indexOf(pt);if(Dt===-1){for(let Lt=0;Lt<R.length;Lt++)if(Lt>=T.length){T.push(pt),Dt=Lt;break}else if(T[Lt]===null){T[Lt]=pt,Dt=Lt;break}if(Dt===-1)break}const ht=R[Dt];ht&&ht.connect(pt)}}function Y(k,et){et===null?k.matrixWorld.copy(k.matrix):k.matrixWorld.multiplyMatrices(et.matrixWorld,k.matrix),k.matrixWorldInverse.copy(k.matrixWorld).invert()}this.updateCamera=function(k){if(s===null)return;let et=k.near,pt=k.far;m.texture!==null&&(m.depthNear>0&&(et=m.depthNear),m.depthFar>0&&(pt=m.depthFar)),$.near=L.near=C.near=et,$.far=L.far=C.far=pt,(I!==$.near||W!==$.far)&&(s.updateRenderState({depthNear:$.near,depthFar:$.far}),I=$.near,W=$.far),$.layers.mask=k.layers.mask|6,C.layers.mask=$.layers.mask&-5,L.layers.mask=$.layers.mask&-3;const Dt=k.parent,ht=$.cameras;Y($,Dt);for(let Lt=0;Lt<ht.length;Lt++)Y(ht[Lt],Dt);$.projectionMatrix.copy(C.projectionMatrix),$.projectionMatrixInverse.copy(C.projectionMatrixInverse),O===null&&k.isPerspectiveCamera&&(O={camera:k,fov:k.fov,zoom:k.zoom}),N(k,$,Dt)};function N(k,et,pt){pt===null?k.matrix.copy(et.matrixWorld):(k.matrix.copy(pt.matrixWorld),k.matrix.invert(),k.matrix.multiply(et.matrixWorld)),k.matrix.decompose(k.position,k.quaternion,k.scale),k.updateMatrixWorld(!0),k.projectionMatrix.copy(et.projectionMatrix),k.projectionMatrixInverse.copy(et.projectionMatrixInverse),k.isPerspectiveCamera&&(k.fov=js*2*Math.atan(1/k.projectionMatrix.elements[5]),k.zoom=1)}this.getCamera=function(){return $},this.getFoveation=function(){if(!(d===null&&u===null))return l},this.setFoveation=function(k){l=k,d!==null&&(d.fixedFoveation=k),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=k)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh($)},this.getCameraTexture=function(k){return g[k]};let U=null;function K(k,et){if(h=et.getViewerPose(c||a),p=et,h!==null){const pt=h.views;u!==null&&(t.setRenderTargetFramebuffer(S,u.framebuffer),t.setRenderTarget(S));let Dt=!1;pt.length!==$.cameras.length&&($.cameras.length=0,Dt=!0);for(let zt=0;zt<pt.length;zt++){const Qt=pt[zt];let ee=null;if(u!==null)ee=u.getViewport(Qt);else{const mt=f.getViewSubImage(d,Qt);ee=mt.viewport,zt===0&&(t.setRenderTargetTextures(S,mt.colorTexture,mt.depthStencilTexture),t.setRenderTarget(S))}let it=z[zt];it===void 0&&(it=new En,it.layers.enable(zt),it.viewport=new Re,z[zt]=it),it.matrix.fromArray(Qt.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(Qt.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(ee.x,ee.y,ee.width,ee.height),zt===0&&($.matrix.copy(it.matrix),$.matrix.decompose($.position,$.quaternion,$.scale)),Dt===!0&&$.cameras.push(it)}const ht=s.enabledFeatures;if(ht&&ht.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&y){f=n.getBinding();const zt=f.getDepthInformation(pt[0]);zt&&zt.isValid&&zt.texture&&m.init(zt,s.renderState)}if(ht&&ht.includes("camera-access")&&y){t.state.unbindTexture(),f=n.getBinding();for(let zt=0;zt<pt.length;zt++){const Qt=pt[zt].camera;if(Qt){let ee=g[Qt];ee||(ee=new ou,g[Qt]=ee);const it=f.getCameraImage(Qt);ee.sourceTexture=it}}}}for(let pt=0;pt<R.length;pt++){const Dt=T[pt],ht=R[pt];Dt!==null&&ht!==void 0&&ht.update(Dt,et,c||a)}U&&U(k,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),p=null}const st=new vu;st.setAnimationLoop(K),this.setAnimationLoop=function(k){U=k},this.dispose=function(){}}}const cx=new fe,Cu=new Wt;Cu.set(-1,0,0,0,1,0,0,0,1);function hx(i,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,gu(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,v,E,S){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(m,g):g.isMeshLambertMaterial?(r(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(m,g),f(m,g)):g.isMeshPhongMaterial?(r(m,g),h(m,g),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(m,g),d(m,g),g.isMeshPhysicalMaterial&&u(m,g,S)):g.isMeshMatcapMaterial?(r(m,g),p(m,g)):g.isMeshDepthMaterial?r(m,g):g.isMeshDistanceMaterial?(r(m,g),y(m,g)):g.isMeshNormalMaterial?r(m,g):g.isLineBasicMaterial?(a(m,g),g.isLineDashedMaterial&&o(m,g)):g.isPointsMaterial?l(m,g,v,E):g.isSpriteMaterial?c(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===on&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===on&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const v=t.get(g),E=v.envMap,S=v.envMapRotation;E&&(m.envMap.value=E,m.envMapRotation.value.setFromMatrix4(cx.makeRotationFromEuler(S)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Cu),m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function a(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function o(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,v,E){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*v,m.scale.value=E*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function u(m,g,v){m.ior.value=g.ior,g.diffuseRoughness>0&&(m.diffuseRoughness.value=g.diffuseRoughness,g.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=g.diffuseRoughnessMap,e(g.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===on&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.retroreflectivity>0&&(m.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=g.iridescenceThicknessMaximum,g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function y(m,g){const v=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ux(i,t,e,n){let s={},r={};function a(v,E){const S=E.program;n.uniformBlockBinding(v,S,s[v.id])}function o(v,E){let S=s[v.id];S===void 0&&(p(v),S=l(v),s[v.id]=S,v.addEventListener("dispose",m));const R=E.program;n.updateUBOMapping(v,R);const T=t.render.frame;r[v.id]!==T&&(c(v),r[v.id]=T)}function l(v){const E=i.createBuffer(),S=v.__size,R=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,S,R),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function c(v){const E=s[v.id],S=v.uniforms,R=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,_=S.length;T<_;T++){const b=S[T];if(Array.isArray(b))for(let O=0,C=b.length;O<C;O++)h(b[O],T,O,R);else h(b,T,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function h(v,E,S,R){if(d(v,E,S,R)===!0){const T=v.__offset,_=v.value;if(Array.isArray(_)){let b=0;for(let O=0;O<_.length;O++){const C=_[O],L=y(C,!0);f(C,v.__data,b),b+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else f(_,v.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,v.__data)}}function f(v,E,S){typeof v=="number"||typeof v=="boolean"?E[S]=v:v.isMatrix3?(E[S]=v.elements[0],E[S+1]=v.elements[1],E[S+2]=v.elements[2],E[S+3]=0,E[S+4]=v.elements[3],E[S+5]=v.elements[4],E[S+6]=v.elements[5],E[S+7]=0,E[S+8]=v.elements[6],E[S+9]=v.elements[7],E[S+10]=v.elements[8],E[S+11]=0):ArrayBuffer.isView(v)?E.set(v.subarray(0,E.length-S),S):v.toArray(E,S)}function d(v,E,S,R){const T=v.value,_=E+"_"+S;if(Array.isArray(T)){R[_]===void 0&&(R[_]=[]);const b=R[_];let O=!1;for(let C=0;C<T.length;C++)u(T[C],b,C)===!0&&(O=!0);return O}return u(T,R,_)}function u(v,E,S){if(E[S]===void 0)return typeof v=="number"||typeof v=="boolean"?E[S]=v:ArrayBuffer.isView(v)?E[S]=v.slice():E[S]=v.clone(),!0;{const R=E[S];if(typeof v=="number"||typeof v=="boolean"){if(R!==v)return E[S]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(R.equals(v)===!1)return R.copy(v),!0}}return!1}function p(v){const E=v.uniforms;let S=0;const R=16;for(let _=0,b=E.length;_<b;_++){const O=Array.isArray(E[_])?E[_]:[E[_]];for(let C=0,L=O.length;C<L;C++){const z=O[C],$=Array.isArray(z.value)?z.value:[z.value],I=Array.isArray(E[_])||Array.isArray(z.value);let W=S;for(let G=0,rt=$.length;G<rt;G++){const Y=$[G],N=y(Y,I),U=S%R,K=U%N.boundary,st=U+K;S+=K,st!==0&&R-st<N.storage&&(S+=R-st),G===0&&(W=S),S+=N.storage}const Z=z.type==="int"?Int32Array:z.type==="uint"?Uint32Array:Float32Array;z.__data=new Z((S-W)/Float32Array.BYTES_PER_ELEMENT),z.__offset=W}}const T=S%R;return T>0&&(S+=R-T),v.__size=S,v.__cache={},this}function y(v,E){const S={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(S.boundary=4,S.storage=4):v.isVector2?(S.boundary=8,S.storage=8):v.isVector3||v.isColor?(S.boundary=16,S.storage=12):v.isVector4?(S.boundary=16,S.storage=16):v.isMatrix3?(S.boundary=16,S.storage=48):v.isMatrix4?(S.boundary=16,S.storage=64):v.isTexture?kt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(S.boundary=16,S.storage=v.byteLength):kt("WebGLRenderer: Unsupported uniform value type.",v),E===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function m(v){const E=v.target;E.removeEventListener("dispose",m),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function g(){for(const v in s)i.deleteBuffer(s[v]);s={},r={}}return{bind:a,update:o,dispose:g}}const dx=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let In=null;function fx(){return In===null&&(In=new iu(dx,16,16,Hi,Hn),In.name="DFG_LUT",In.minFilter=sn,In.magFilter=sn,In.wrapS=ti,In.wrapT=ti,In.generateMipmaps=!1,In.needsUpdate=!0),In}class px{constructor(t={}){const{canvas:e=Fd(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:u=hn}=t;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;const y=u,m=new Set([El,bl,Ml]),g=new Set([hn,Gn,Ks,_s,vl,yl]),v=new Uint32Array(4),E=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]};let R=null,T=null;const _=[],b=[];let O=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ii,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let L=!1,z=null,$=null,I=null,W=null;this._outputColorSpace=Ve;let Z=0,G=0,rt=null,Y=-1,N=null;const U=new Re,K=new Re;let st=null;const k=new Kt(0);let et=0,pt=e.width,Dt=e.height,ht=1,Lt=null,Se=null;const zt=new Re(0,0,pt,Dt),Qt=new Re(0,0,pt,Dt);let ee=!1;const it=new tr,mt=new Dl;let ut=!1,Tt=!1;const Mt=new fe,Vt=new D,Nt=new Re,ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ie=!1;function ce(){return rt===null?ht:1}let B=n;function Ce(M,F){return e.getContext(M,F)}let jt,ge,vt,we,Bt,Gt,w,x,V,at,nt,dt,yt,Q,j,gt,P,tt,J,_t,ct,ft,Ut;try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_l}`),e.addEventListener("webglcontextlost",Ot,!1),e.addEventListener("webglcontextrestored",$t,!1),e.addEventListener("webglcontextcreationerror",bt,!1),B===null){const F="webgl2";if(B=Ce(F,M),B===null)throw Ce(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Jt()}catch(M){throw e.removeEventListener("webglcontextlost",Ot,!1),e.removeEventListener("webglcontextrestored",$t,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),oe("WebGLRenderer: "+M.message),M}function Jt(){jt=new _0(B),jt.init(),ct=new sx(B,jt),ge=new a0(B,jt,t,ct),vt=new nx(B,jt),ge.reversedDepthBuffer&&d&&vt.buffers.depth.setReversed(!0),$=B.createFramebuffer(),I=B.createFramebuffer(),W=B.createFramebuffer(),we=new y0(B),Bt=new H_,Gt=new ix(B,jt,vt,Bt,ge,ct,we),w=new g0(C),x=new Mp(B),ft=new s0(B,x),V=new x0(B,x,we,ft),at=new M0(B,V,x,ft,we),tt=new S0(B,ge,Gt),j=new o0(Bt),nt=new G_(C,w,jt,ge,ft,j),dt=new hx(C,Bt),yt=new W_,Q=new Z_(jt),P=new i0(C,w,vt,at,p,l),gt=new ex(C,at,ge),Ut=new ux(B,we,ge,vt),J=new r0(B,jt,we),_t=new v0(B,jt,we),we.programs=nt.programs,C.capabilities=ge,C.extensions=jt,C.properties=Bt,C.renderLists=yt,C.shadowMap=gt,C.state=vt,C.info=we}y!==hn&&(O=new E0(y,e.width,e.height,o,s,r));const ot=new lx(C,B);this.xr=ot,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const M=jt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=jt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ht},this.setPixelRatio=function(M){M!==void 0&&(ht=M,this.setSize(pt,Dt,!1))},this.getSize=function(M){return M.set(pt,Dt)},this.setSize=function(M,F,q=!0){if(ot.isPresenting){kt("WebGLRenderer: Can't change size while VR device is presenting.");return}pt=M,Dt=F,e.width=Math.floor(M*ht),e.height=Math.floor(F*ht),q===!0&&(e.style.width=M+"px",e.style.height=F+"px"),O!==null&&O.setSize(e.width,e.height),this.setViewport(0,0,M,F)},this.getDrawingBufferSize=function(M){return M.set(pt*ht,Dt*ht).floor()},this.setDrawingBufferSize=function(M,F,q){pt=M,Dt=F,ht=q,e.width=Math.floor(M*q),e.height=Math.floor(F*q),this.setViewport(0,0,M,F)},this.setEffects=function(M){if(y===hn){oe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let F=0;F<M.length;F++)if(M[F].isOutputPass===!0){kt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}O.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(U)},this.getViewport=function(M){return M.copy(zt)},this.setViewport=function(M,F,q,H){M.isVector4?zt.set(M.x,M.y,M.z,M.w):zt.set(M,F,q,H),vt.viewport(U.copy(zt).multiplyScalar(ce()).round())},this.getScissor=function(M){return M.copy(Qt)},this.setScissor=function(M,F,q,H){M.isVector4?Qt.set(M.x,M.y,M.z,M.w):Qt.set(M,F,q,H),vt.scissor(K.copy(Qt).multiplyScalar(ce()).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(M){vt.setScissorTest(ee=M)},this.setOpaqueSort=function(M){Lt=M},this.setTransparentSort=function(M){Se=M},this.getClearColor=function(M){return M.copy(P.getClearColor())},this.setClearColor=function(){P.setClearColor(...arguments)},this.getClearAlpha=function(){return P.getClearAlpha()},this.setClearAlpha=function(){P.setClearAlpha(...arguments)},this.clear=function(M=!0,F=!0,q=!0){let H=0;if(M){let X=!1;if(rt!==null){const St=rt.texture.format;X=m.has(St)}if(X){const St=rt.texture.type,Rt=g.has(St),xt=P.getClearColor(),wt=P.getClearAlpha(),It=xt.r,Ht=xt.g,se=xt.b;Rt?(v[0]=It,v[1]=Ht,v[2]=se,v[3]=wt,B.clearBufferuiv(B.COLOR,0,v)):(E[0]=It,E[1]=Ht,E[2]=se,E[3]=wt,B.clearBufferiv(B.COLOR,0,E))}else H|=B.COLOR_BUFFER_BIT}F&&(H|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(H|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),H!==0&&B.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),z=M},this.dispose=function(){e.removeEventListener("webglcontextlost",Ot,!1),e.removeEventListener("webglcontextrestored",$t,!1),e.removeEventListener("webglcontextcreationerror",bt,!1),P.dispose(),yt.dispose(),Q.dispose(),Gt.dispose(),Bt.dispose(),w.dispose(),at.dispose(),V.dispose(),ft.dispose(),Ut.dispose(),nt.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",ql),ot.removeEventListener("sessionend",$l),Ci.stop()};function Ot(M){M.preventDefault(),aa("WebGLRenderer: Context Lost."),L=!0}function $t(){aa("WebGLRenderer: Context Restored."),L=!1;const M=we.autoReset,F=gt.enabled,q=gt.autoUpdate,H=gt.needsUpdate,X=gt.type;Jt(),we.autoReset=M,gt.enabled=F,gt.autoUpdate=q,gt.needsUpdate=H,gt.type=X}function bt(M){oe("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function pe(M){const F=M.target;F.removeEventListener("dispose",pe),Fe(F)}function Fe(M){li(M),Bt.remove(M)}function li(M){const F=Bt.get(M).programs;F!==void 0&&(F.forEach(function(q){nt.releaseProgram(q)}),M.isShaderMaterial&&nt.releaseShaderCache(M))}this.renderBufferDirect=function(M,F,q,H,X,St){F===null&&(F=ne);const Rt=X.isMesh&&X.matrixWorld.determinantAffine()<0,xt=Qu(M,F,q,H,X);vt.setMaterial(H,Rt);let wt=q.index,It=1;if(H.wireframe===!0){if(wt=V.getWireframeAttribute(q),wt===void 0)return;It=2}const Ht=q.drawRange,se=q.attributes.position;let Ct=Ht.start*It,re=(Ht.start+Ht.count)*It;St!==null&&(Ct=Math.max(Ct,St.start*It),re=Math.min(re,(St.start+St.count)*It)),wt!==null?(Ct=Math.max(Ct,0),re=Math.min(re,wt.count)):se!=null&&(Ct=Math.max(Ct,0),re=Math.min(re,se.count));const Pe=re-Ct;if(Pe<0||Pe===1/0)return;ft.setup(X,H,xt,q,wt);let ve,_e=J;if(wt!==null&&(ve=x.get(wt),_e=_t,_e.setIndex(ve)),X.isMesh)H.wireframe===!0?(vt.setLineWidth(H.wireframeLinewidth*ce()),_e.setMode(B.LINES)):_e.setMode(B.TRIANGLES);else if(X.isLine){let Xe=H.linewidth;Xe===void 0&&(Xe=1),vt.setLineWidth(Xe*ce()),X.isLineSegments?_e.setMode(B.LINES):X.isLineLoop?_e.setMode(B.LINE_LOOP):_e.setMode(B.LINE_STRIP)}else X.isPoints?_e.setMode(B.POINTS):X.isSprite&&_e.setMode(B.TRIANGLES);if(X.isBatchedMesh)if(jt.get("WEBGL_multi_draw"))_e.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Xe=X._multiDrawStarts,Pt=X._multiDrawCounts,Qe=X._multiDrawCount,ue=wt?x.get(wt).bytesPerElement:1,Pi=Bt.get(H).currentProgram.getUniforms();for(let qe=0;qe<Qe;qe++)Pi.setValue(B,"_gl_DrawID",qe),_e.render(Xe[qe]/ue,Pt[qe])}else if(X.isInstancedMesh)_e.renderInstances(Ct,Pe,X.count);else if(q.isInstancedBufferGeometry){const Xe=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Pt=Math.min(q.instanceCount,Xe);_e.renderInstances(Ct,Pe,Pt)}else _e.render(Ct,Pe)};function Xl(M,F,q,H){z!==null&&M.isNodeMaterial&&z.setObject(H,M),ut===!0&&j.setState(M,q,!1),M.transparent===!0&&M.side===nn&&M.forceSinglePass===!1?(M.side=on,M.needsUpdate=!0,ws(M,F,H),M.side=Gi,M.needsUpdate=!0,ws(M,F,H),M.side=nn):ws(M,F,H)}this.compile=function(M,F,q=null){q===null&&(q=M),z!==null&&z.renderStart(M,F,q),T=Q.get(q),T.init(F),b.push(T),q.traverseVisible(function(X){X.isLight&&X.layers.test(F.layers)&&(T.pushLight(X),X.castShadow&&T.pushShadow(X))}),M!==q&&M.traverseVisible(function(X){X.isLight&&X.layers.test(F.layers)&&(T.pushLight(X),X.castShadow&&T.pushShadow(X))}),T.setupLights(),z!==null&&z.updateLights(T.state.lightsArray),Tt=this.localClippingEnabled,ut=j.init(this.clippingPlanes,Tt),ut===!0&&j.setGlobalState(this.clippingPlanes,F),z!==null&&gt.render(T.state.shadowsArray,q,F);const H=new Set;return M.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const St=X.material;if(St)if(Array.isArray(St))for(let Rt=0;Rt<St.length;Rt++){const xt=St[Rt];Xl(xt,q,F,X),H.add(xt)}else Xl(St,q,F,X),H.add(St)}),T=b.pop(),z!==null&&z.renderEnd(),H},this.compileAsync=function(M,F,q=null){const H=this.compile(M,F,q);return new Promise(X=>{function St(){if(H.forEach(function(Rt){const wt=Bt.get(Rt).currentProgram;(wt===void 0||wt.isReady())&&H.delete(Rt)}),H.size===0){X(M);return}setTimeout(St,10)}jt.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let ba=null;function Zu(M){ba&&ba(M)}function ql(){Ci.stop()}function $l(){Ci.start()}const Ci=new vu;Ci.setAnimationLoop(Zu),typeof self<"u"&&Ci.setContext(self),this.setAnimationLoop=function(M){ba=M,ot.setAnimationLoop(M),M===null?Ci.stop():Ci.start()},ot.addEventListener("sessionstart",ql),ot.addEventListener("sessionend",$l),this.render=function(M,F){if(F!==void 0&&F.isCamera!==!0){oe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;z!==null&&z.renderStart(M,F);const q=ot.enabled===!0&&ot.isPresenting===!0,H=O!==null&&(rt===null||q)&&O.begin(C,rt);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(O===null||O.isCompositing()===!1)&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(F),F=ot.getCamera()),M.isScene===!0&&M.onBeforeRender(C,M,F,rt),T=Q.get(M,b.length),T.init(F),T.state.textureUnits=Gt.getTextureUnits(),b.push(T),Mt.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),F.isArrayCamera?mt.setFromArrayCamera(F):it.setFromProjectionMatrix(Mt,Tn,F.reversedDepth),Tt=this.localClippingEnabled,ut=j.init(this.clippingPlanes,Tt),R=yt.get(M,_.length),R.init(),_.push(R),this.info.render.frame++,ot.enabled===!0&&ot.isPresenting===!0){const Rt=C.xr.getDepthSensingMesh();Rt!==null&&Ea(Rt,F,-1/0,C.sortObjects)}Ea(M,F,0,C.sortObjects),R.finish(),z!==null&&z.updateLights(T.state.lightsArray),C.sortObjects===!0&&R.sort(Lt,Se),ie=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,ie&&P.addToRenderList(R,M),this.info.autoReset===!0&&this.info.reset(),ut===!0&&j.beginShadows();const X=T.state.shadowsArray;if(gt.render(X,M,F),ut===!0&&j.endShadows(),(H&&O.hasRenderPass())===!1){const Rt=R.opaque,xt=R.transmissive;if(T.setupLights(),F.isArrayCamera){const wt=F.cameras;if(xt.length>0)for(let It=0,Ht=wt.length;It<Ht;It++){const se=wt[It];Jl(Rt,xt,M,se)}ie&&P.render(M);for(let It=0,Ht=wt.length;It<Ht;It++){const se=wt[It];Yl(R,M,se,se.viewport)}}else xt.length>0&&Jl(Rt,xt,M,F),ie&&P.render(M),Yl(R,M,F)}rt!==null&&G===0&&(Gt.updateMultisampleRenderTarget(rt),Gt.updateRenderTargetMipmap(rt)),H&&O.end(C),M.isScene===!0&&M.onAfterRender(C,M,F),ft.resetDefaultState(),Y=-1,N=null,b.pop(),b.length>0?(T=b[b.length-1],Gt.setTextureUnits(T.state.textureUnits),ut===!0&&j.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,_.pop(),_.length>0?R=_[_.length-1]:R=null,z!==null&&z.renderEnd()};function Ea(M,F,q,H){if(M.visible===!1)return;if(M.layers.test(F.layers)){if(M.isGroup)q=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(F);else if(M.isLight)T.pushLight(M),M.castShadow&&T.pushShadow(M);else if(M.isSprite){const Rt=F.isArrayCamera?mt:it;if(!M.frustumCulled||M.intersectsFrustum(Rt)){H&&Nt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Mt);const xt=at.update(M),wt=M.material;wt.visible&&R.push(M,xt,wt,q,Nt.z,null,F)}}else if(M.isMesh||M.isLine||M.isPoints){const Rt=F.isArrayCamera?mt:it;if(!M.frustumCulled||M.intersectsFrustum(Rt)){const xt=at.update(M),wt=M.material;if(H&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Nt.copy(M.boundingSphere.center)):(xt.boundingSphere===null&&xt.computeBoundingSphere(),Nt.copy(xt.boundingSphere.center)),Nt.applyMatrix4(M.matrixWorld).applyMatrix4(Mt)),Array.isArray(wt)){const It=xt.groups;for(let Ht=0,se=It.length;Ht<se;Ht++){const Ct=It[Ht],re=wt[Ct.materialIndex];re&&re.visible&&R.push(M,xt,re,q,Nt.z,Ct,F)}}else wt.visible&&R.push(M,xt,wt,q,Nt.z,null,F)}}}const St=M.children;for(let Rt=0,xt=St.length;Rt<xt;Rt++)Ea(St[Rt],F,q,H)}function Yl(M,F,q,H){const{opaque:X,transmissive:St,transparent:Rt}=M;T.setupLightsView(q),ut===!0&&j.setGlobalState(C.clippingPlanes,q),H&&vt.viewport(U.copy(H)),X.length>0&&hr(X,F,q),St.length>0&&hr(St,F,q),Rt.length>0&&hr(Rt,F,q),vt.buffers.depth.setTest(!0),vt.buffers.depth.setMask(!0),vt.buffers.color.setMask(!0),vt.setPolygonOffset(!1)}function Jl(M,F,q,H){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[H.id]===void 0){const Ct=jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[H.id]=new kn(1,1,{generateMipmaps:!0,type:Ct?Hn:hn,minFilter:ei,samples:Math.max(4,ge.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ae.workingColorSpace})}const St=T.state.transmissionRenderTarget[H.id],Rt=H.viewport||U;St.setSize(Rt.z*C.transmissionResolutionScale,Rt.w*C.transmissionResolutionScale);const xt=C.getRenderTarget(),wt=C.getActiveCubeFace(),It=C.getActiveMipmapLevel();C.setRenderTarget(St),C.getClearColor(k),et=C.getClearAlpha(),et<1&&C.setClearColor(16777215,.5),C.clear(),ie&&P.render(q);const Ht=C.toneMapping;C.toneMapping=ii;const se=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),T.setupLightsView(H),ut===!0&&j.setGlobalState(C.clippingPlanes,H),hr(M,q,H),Gt.updateMultisampleRenderTarget(St),Gt.updateRenderTargetMipmap(St),jt.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let re=0,Pe=F.length;re<Pe;re++){const ve=F[re],{object:_e,geometry:Xe,material:Pt,group:Qe}=ve;if(Pt.side===nn&&_e.layers.test(H.layers)){const ue=Pt.side;Pt.side=on,Pt.needsUpdate=!0,Zl(_e,q,H,Xe,Pt,Qe),Pt.side=ue,Pt.needsUpdate=!0,Ct=!0}}Ct===!0&&(Gt.updateMultisampleRenderTarget(St),Gt.updateRenderTargetMipmap(St))}C.setRenderTarget(xt,wt,It),C.setClearColor(k,et),se!==void 0&&(H.viewport=se),C.toneMapping=Ht}function hr(M,F,q){const H=F.isScene===!0?F.overrideMaterial:null;for(let X=0,St=M.length;X<St;X++){const Rt=M[X],{object:xt,geometry:wt,group:It}=Rt;let Ht=Rt.material;Ht.allowOverride===!0&&H!==null&&(Ht=H),xt.layers.test(q.layers)&&Zl(xt,F,q,wt,Ht,It)}}function Zl(M,F,q,H,X,St){z!==null&&X.isNodeMaterial&&z.setObject(M,X),M.onBeforeRender(C,F,q,H,X,St),M.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),X.onBeforeRender(C,F,q,H,M,St),X.transparent===!0&&X.side===nn&&X.forceSinglePass===!1?(X.side=on,X.needsUpdate=!0,C.renderBufferDirect(q,F,H,X,M,St),X.side=Gi,X.needsUpdate=!0,C.renderBufferDirect(q,F,H,X,M,St),X.side=nn):C.renderBufferDirect(q,F,H,X,M,St),M.onAfterRender(C,F,q,H,X,St)}function Kl(M){let F=0;for(const q of M)q.texture!==null&&F++;return F}function ws(M,F,q){F.isScene!==!0&&(F=ne);const H=Bt.get(M),X=T.state.lights,St=T.state.shadowsArray,Rt=X.state.version,xt=nt.getParameters(M,X.state,St,F,q,T.state.lightProbeGridArray),wt=nt.getProgramCacheKey(xt);let It=H.programs;H.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?F.environment:null,H.fog=F.fog;const Ht=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;H.envMap=w.get(M.envMap||H.environment,Ht),H.envMapRotation=H.environment!==null&&M.envMap===null?F.environmentRotation:M.envMapRotation,It===void 0&&(M.addEventListener("dispose",pe),It=new Map,H.programs=It,H.programVariants=new Map);let se=It.get(wt);if(se!==void 0){if(H.currentProgram===se&&H.lightsStateVersion===Rt)return jl(M,xt),se}else xt.uniforms=nt.getUniforms(M),z!==null&&M.isNodeMaterial&&z.build(M,q,xt),M.onBeforeCompile(xt,C),se=nt.acquireProgram(xt,wt),It.set(wt,se),H.uniforms=xt.uniforms;const Ct=H.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ct.clippingPlanes=j.uniform),jl(M,xt),H.needsLights=td(M),H.lightsStateVersion=Rt,H.needsLights&&(Ct.ambientLightColor.value=X.state.ambient,Ct.lightProbe.value=X.state.probe,Ct.sunLights.value=X.state.sun,Ct.sunLightShadows.value=X.state.sunShadow,Ct.directionalLights.value=X.state.directional,Ct.directionalLightShadows.value=X.state.directionalShadow,Ct.spotLights.value=X.state.spot,Ct.spotLightShadows.value=X.state.spotShadow,Ct.rectAreaLights.value=X.state.rectArea,Ct.ltc_1.value=X.state.rectAreaLTC1,Ct.ltc_2.value=X.state.rectAreaLTC2,Ct.pointLights.value=X.state.point,Ct.pointLightShadows.value=X.state.pointShadow,Ct.hemisphereLights.value=X.state.hemi,Ct.sunShadowMatrix.value=X.state.sunShadowMatrix,Ct.sunShadowCascade.value=X.state.sunShadowCascade,Ct.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ct.spotLightMatrix.value=X.state.spotLightMatrix,Ct.spotLightMap.value=X.state.spotLightMap,Ct.pointShadowMatrix.value=X.state.pointShadowMatrix),H.numLightProbeGrids=Kl(T.state.lightProbeGridArray),H.currentProgram=se,H.uniformsList=null,se}function Ku(M,F,q,H,X){const St=Bt.get(M),Rt=St.currentProgram.id+","+H+","+X;let xt=St.programVariants.get(Rt);return xt===void 0?(xt=ws(M,F,q),St.programVariants.set(Rt,xt)):(St.currentProgram=xt,St.uniformsList=null,St.outputColorSpace=H,St.toneMapping=X),xt}function Ql(M){if(M.uniformsList===null){const F=M.currentProgram.getUniforms();M.uniformsList=Kr.seqWithValue(F.seq,M.uniforms)}return M.uniformsList}function jl(M,F){const q=Bt.get(M);q.outputColorSpace=F.outputColorSpace,q.batching=F.batching,q.batchingColor=F.batchingColor,q.instancing=F.instancing,q.instancingColor=F.instancingColor,q.instancingMorph=F.instancingMorph,q.skinning=F.skinning,q.morphTargets=F.morphTargets,q.morphNormals=F.morphNormals,q.morphColors=F.morphColors,q.morphTargetsCount=F.morphTargetsCount,q.numClippingPlanes=F.numClippingPlanes,q.numIntersection=F.numClipIntersection,q.vertexAlphas=F.vertexAlphas,q.vertexTangents=F.vertexTangents,q.toneMapping=F.toneMapping}function Qu(M,F,q,H,X){F.isScene!==!0&&(F=ne),Gt.resetTextureUnits();const St=F.fog,Rt=H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial?F.environment:null,xt=rt===null?C.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:ae.workingColorSpace,wt=H.isMeshStandardMaterial||H.isMeshLambertMaterial&&!H.envMap||H.isMeshPhongMaterial&&!H.envMap,It=w.get(H.envMap||Rt,wt),Ht=H.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,se=!!q.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ct=!!q.morphAttributes.position,re=!!q.morphAttributes.normal,Pe=!!q.morphAttributes.color;let ve=ii;H.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(ve=C.toneMapping);const _e=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Xe=_e!==void 0?_e.length:0,Pt=Bt.get(H),Qe=T.state.lights;if(ut===!0&&(Tt===!0||M!==N)){const be=M===N&&H.id===Y;j.setState(H,M,be)}let ue=!1,Pi=!1;H.version===Pt.__version?Pt.needsLights&&Pt.lightsStateVersion!==Qe.state.version||X.isBatchedMesh&&Pt.batching===!1||!X.isBatchedMesh&&Pt.batching===!0||X.isBatchedMesh&&Pt.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Pt.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Pt.instancing===!1||!X.isInstancedMesh&&Pt.instancing===!0||X.isSkinnedMesh&&Pt.skinning===!1||!X.isSkinnedMesh&&Pt.skinning===!0||X.isInstancedMesh&&Pt.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Pt.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Pt.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Pt.instancingMorph===!1&&X.morphTexture!==null||Pt.envMap!==It||H.fog===!0&&Pt.fog!==St||Pt.numClippingPlanes!==void 0&&(Pt.numClippingPlanes!==j.numPlanes||Pt.numIntersection!==j.numIntersection)||Pt.vertexAlphas!==Ht||Pt.vertexTangents!==se||Pt.morphTargets!==Ct||Pt.morphNormals!==re||Pt.morphColors!==Pe||Pt.morphTargetsCount!==Xe||Pt.numLightProbeGrids!==Kl(T.state.lightProbeGridArray)?ue=!0:(Pt.outputColorSpace!==xt||Pt.toneMapping!==ve)&&(Pi=!0):(ue=!0,Pt.__version=H.version);let qe=Pt.currentProgram;(ue===!0||Pi===!0)&&(qe=Pi===!0?Ku(H,F,X,xt,ve):ws(H,F,X),z&&H.isNodeMaterial&&z.onUpdateProgram(H,qe,Pt));let ur=!1,ci=!1,Li=!1;const le=qe.getUniforms(),Ge=Pt.uniforms;if(vt.useProgram(qe.program)&&(ur=!0,ci=!0,Li=!0),H.id!==Y&&(Y=H.id,ci=!0),ur||N!==M){vt.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),le.setValue(B,"projectionMatrix",M.projectionMatrix),le.setValue(B,"viewMatrix",M.matrixWorldInverse);const Oe=le.map.cameraPosition;Oe!==void 0&&Oe.setValue(B,Vt.setFromMatrixPosition(M.matrixWorld)),ge.logarithmicDepthBuffer&&le.setValue(B,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&le.setValue(B,"isOrthographic",M.isOrthographicCamera===!0),N!==M&&(N=M,ci=!0,Li=!0)}if(Pt.needsLights&&(Qe.state.sunShadowMap.length>0&&le.setValue(B,"sunShadowMap",Qe.state.sunShadowMap,Gt),Qe.state.directionalShadowMap.length>0&&le.setValue(B,"directionalShadowMap",Qe.state.directionalShadowMap,Gt),Qe.state.spotShadowMap.length>0&&le.setValue(B,"spotShadowMap",Qe.state.spotShadowMap,Gt),Qe.state.pointShadowMap.length>0&&le.setValue(B,"pointShadowMap",Qe.state.pointShadowMap,Gt)),X.isSkinnedMesh){le.setOptional(B,X,"bindMatrix"),le.setOptional(B,X,"bindMatrixInverse");const be=X.skeleton;be&&(be.boneTexture===null&&be.computeBoneTexture(),le.setValue(B,"boneTexture",be.boneTexture,Gt))}X.isBatchedMesh&&(le.setOptional(B,X,"batchingTexture"),le.setValue(B,"batchingTexture",X._matricesTexture,Gt),le.setOptional(B,X,"batchingIdTexture"),le.setValue(B,"batchingIdTexture",X._indirectTexture,Gt),le.setOptional(B,X,"batchingColorTexture"),X._colorsTexture!==null&&le.setValue(B,"batchingColorTexture",X._colorsTexture,Gt));const vn=q.morphAttributes;if((vn.position!==void 0||vn.normal!==void 0||vn.color!==void 0)&&tt.update(X,q,qe),(ci||Pt.receiveShadow!==X.receiveShadow)&&(Pt.receiveShadow=X.receiveShadow,le.setValue(B,"receiveShadow",X.receiveShadow)),(H.isMeshStandardMaterial||H.isMeshLambertMaterial||H.isMeshPhongMaterial)&&H.envMap===null&&F.environment!==null&&(Ge.envMapIntensity.value=F.environmentIntensity),Ge.dfgLUT!==void 0&&(Ge.dfgLUT.value=fx()),ci){if(le.setValue(B,"toneMappingExposure",C.toneMappingExposure),Pt.needsLights&&ju(Ge,Li),St&&H.fog===!0&&dt.refreshFogUniforms(Ge,St),dt.refreshMaterialUniforms(Ge,H,ht,Dt,T.state.transmissionRenderTarget[M.id]),Pt.needsLights&&Pt.numLightProbeGrids>0){const be=S;let Oe=0;for(const qn of T.state.lightProbeGridArray)qn.texture!==null&&(be.textures[Oe]=qn.texture,be.min[Oe]=qn.boundingBox.min,be.max[Oe]=qn.boundingBox.max,be.resolution[Oe]=qn.resolution,Oe++);for(const qn in be)be[qn].length=Oe;Ge.probesSH.value=be.textures,Ge.probesMin.value=be.min,Ge.probesMax.value=be.max,Ge.probesResolution.value=be.resolution}Kr.upload(B,Ql(Pt),Ge,Gt)}if(H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Kr.upload(B,Ql(Pt),Ge,Gt),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&le.setValue(B,"center",X.center),le.setValue(B,"modelViewMatrix",X.modelViewMatrix),le.setValue(B,"normalMatrix",X.normalMatrix),le.setValue(B,"modelMatrix",X.matrixWorld),H.uniformsGroups!==void 0){const be=H.uniformsGroups;for(let Oe=0,qn=be.length;Oe<qn;Oe++){const ec=be[Oe];Ut.update(ec,qe),Ut.bind(ec,qe)}}return qe}function ju(M,F){M.ambientLightColor.needsUpdate=F,M.lightProbe.needsUpdate=F,M.sunLights.needsUpdate=F,M.sunLightShadows.needsUpdate=F,M.directionalLights.needsUpdate=F,M.directionalLightShadows.needsUpdate=F,M.pointLights.needsUpdate=F,M.pointLightShadows.needsUpdate=F,M.spotLights.needsUpdate=F,M.spotLightShadows.needsUpdate=F,M.rectAreaLights.needsUpdate=F,M.hemisphereLights.needsUpdate=F}function td(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return rt},this.setRenderTargetTextures=function(M,F,q){const H=Bt.get(M);H.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),Bt.get(M.texture).__webglTexture=F,Bt.get(M.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:q,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,F){const q=Bt.get(M);q.__webglFramebuffer=F,q.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(M,F=0,q=0){rt=M,Z=F,G=q;let H=null,X=!1,St=!1;if(M){const xt=Bt.get(M);if(xt.__useDefaultFramebuffer!==void 0){vt.bindFramebuffer(B.FRAMEBUFFER,xt.__webglFramebuffer),U.copy(M.viewport),K.copy(M.scissor),st=M.scissorTest,vt.viewport(U),vt.scissor(K),vt.setScissorTest(st),Y=-1;return}else if(xt.__webglFramebuffer===void 0)Gt.setupRenderTarget(M);else if(xt.__hasExternalTextures)Gt.rebindTextures(M,Bt.get(M.texture).__webglTexture,Bt.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ht=M.depthTexture;if(xt.__boundDepthTexture!==Ht){if(Ht!==null&&Bt.has(Ht)&&(M.width!==Ht.image.width||M.height!==Ht.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Gt.setupDepthRenderbuffer(M)}}const wt=M.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(St=!0);const It=Bt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(It[F])?H=It[F][q]:H=It[F],X=!0):M.samples>0&&Gt.useMultisampledRTT(M)===!1?H=Bt.get(M).__webglMultisampledFramebuffer:Array.isArray(It)?H=It[q]:H=It,U.copy(M.viewport),K.copy(M.scissor),st=M.scissorTest}else U.copy(zt).multiplyScalar(ht).floor(),K.copy(Qt).multiplyScalar(ht).floor(),st=ee;if(q!==0&&(H=$),vt.bindFramebuffer(B.FRAMEBUFFER,H)&&vt.drawBuffers(M,H),vt.viewport(U),vt.scissor(K),vt.setScissorTest(st),X){const xt=Bt.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+F,xt.__webglTexture,q)}else if(St){const xt=F;for(let wt=0;wt<M.textures.length;wt++){const It=Bt.get(M.textures[wt]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+wt,It.__webglTexture,q,xt)}}else if(M!==null&&q!==0){const xt=Bt.get(M.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,xt.__webglTexture,q)}Y=-1};function tc(M){const F=Bt.get(M);return(F.__readFormat!==M.format||F.__readType!==M.type)&&(F.__readFormat=M.format,F.__readType=M.type,F.__formatReadable=ge.textureFormatReadable(M.format),F.__typeReadable=ge.textureTypeReadable(M.type)),F}this.readRenderTargetPixels=function(M,F,q,H,X,St,Rt,xt=0){if(!(M&&M.isWebGLRenderTarget)){oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=Bt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Rt!==void 0&&(wt=wt[Rt],Array.isArray(wt)&&(wt=wt[0])),wt){vt.bindFramebuffer(B.FRAMEBUFFER,wt);try{const It=M.textures[xt],Ht=It.format,se=It.type;M.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xt);const Ct=tc(It);if(Ct.__formatReadable===!1){oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ct.__typeReadable===!1){oe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=M.width-H&&q>=0&&q<=M.height-X&&B.readPixels(F,q,H,X,ct.convert(Ht),ct.convert(se),St)}finally{const It=rt!==null?Bt.get(rt).__webglFramebuffer:null;vt.bindFramebuffer(B.FRAMEBUFFER,It)}}},this.readRenderTargetPixelsAsync=async function(M,F,q,H,X,St,Rt,xt=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=Bt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Rt!==void 0&&(wt=wt[Rt],Array.isArray(wt)&&(wt=wt[0])),wt)if(F>=0&&F<=M.width-H&&q>=0&&q<=M.height-X){vt.bindFramebuffer(B.FRAMEBUFFER,wt);const It=M.textures[xt],Ht=It.format,se=It.type;M.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xt);const Ct=tc(It);if(Ct.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ct.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const re=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,re),B.bufferData(B.PIXEL_PACK_BUFFER,St.byteLength,B.STREAM_READ),B.readPixels(F,q,H,X,ct.convert(Ht),ct.convert(se),0),B.bindBuffer(B.PIXEL_PACK_BUFFER,null);const Pe=rt!==null?Bt.get(rt).__webglFramebuffer:null;vt.bindFramebuffer(B.FRAMEBUFFER,Pe);const ve=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await Od(B,ve,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,re),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,St),B.bindBuffer(B.PIXEL_PACK_BUFFER,null),B.deleteBuffer(re),B.deleteSync(ve),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,F=null,q=0){const H=Math.pow(2,-q),X=Math.floor(M.image.width*H),St=Math.floor(M.image.height*H),Rt=F!==null?F.x:0,xt=F!==null?F.y:0;Gt.setTexture2D(M,0),B.copyTexSubImage2D(B.TEXTURE_2D,q,0,0,Rt,xt,X,St),vt.unbindTexture()},this.copyTextureToTexture=function(M,F,q=null,H=null,X=0,St=0){let Rt,xt,wt,It,Ht,se,Ct,re,Pe;const ve=M.isCompressedTexture?M.mipmaps[St]:M.image;if(q!==null)Rt=q.max.x-q.min.x,xt=q.max.y-q.min.y,wt=q.isBox3?q.max.z-q.min.z:1,It=q.min.x,Ht=q.min.y,se=q.isBox3?q.min.z:0;else{const le=Math.pow(2,-X);Rt=Math.floor(ve.width*le),xt=Math.floor(ve.height*le),M.isDataArrayTexture?wt=ve.depth:M.isData3DTexture?wt=Math.floor(ve.depth*le):wt=1,It=0,Ht=0,se=0}H!==null?(Ct=H.x,re=H.y,Pe=H.z):(Ct=0,re=0,Pe=0);const _e=ct.convert(F.format),Xe=ct.convert(F.type);let Pt;F.isData3DTexture?(Gt.setTexture3D(F,0),Pt=B.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(Gt.setTexture2DArray(F,0),Pt=B.TEXTURE_2D_ARRAY):(Gt.setTexture2D(F,0),Pt=B.TEXTURE_2D),vt.activeTexture(B.TEXTURE0),vt.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,F.flipY),vt.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),vt.pixelStorei(B.UNPACK_ALIGNMENT,F.unpackAlignment);const Qe=vt.getParameter(B.UNPACK_ROW_LENGTH),ue=vt.getParameter(B.UNPACK_IMAGE_HEIGHT),Pi=vt.getParameter(B.UNPACK_SKIP_PIXELS),qe=vt.getParameter(B.UNPACK_SKIP_ROWS),ur=vt.getParameter(B.UNPACK_SKIP_IMAGES);vt.pixelStorei(B.UNPACK_ROW_LENGTH,ve.width),vt.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ve.height),vt.pixelStorei(B.UNPACK_SKIP_PIXELS,It),vt.pixelStorei(B.UNPACK_SKIP_ROWS,Ht),vt.pixelStorei(B.UNPACK_SKIP_IMAGES,se);const ci=M.isDataArrayTexture||M.isData3DTexture,Li=F.isDataArrayTexture||F.isData3DTexture;if(M.isDepthTexture){const le=Bt.get(M),Ge=Bt.get(F),vn=Bt.get(le.__renderTarget),be=Bt.get(Ge.__renderTarget);vt.bindFramebuffer(B.READ_FRAMEBUFFER,vn.__webglFramebuffer),vt.bindFramebuffer(B.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Oe=0;Oe<wt;Oe++)ci&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Bt.get(M).__webglTexture,X,se+Oe),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Bt.get(F).__webglTexture,St,Pe+Oe)),B.blitFramebuffer(It,Ht,It+Rt,Ht+xt,Ct,re,Ct+Rt,re+xt,B.DEPTH_BUFFER_BIT,B.NEAREST);vt.bindFramebuffer(B.READ_FRAMEBUFFER,null),vt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(X!==0||M.isRenderTargetTexture||Bt.has(M)){const le=Bt.get(M),Ge=Bt.get(F);vt.bindFramebuffer(B.READ_FRAMEBUFFER,I),vt.bindFramebuffer(B.DRAW_FRAMEBUFFER,W);for(let vn=0;vn<wt;vn++)ci?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,le.__webglTexture,X,se+vn):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,le.__webglTexture,X),Li?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Ge.__webglTexture,St,Pe+vn):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Ge.__webglTexture,St),X!==0?B.blitFramebuffer(It,Ht,It+Rt,Ht+xt,Ct,re,Ct+Rt,re+xt,B.COLOR_BUFFER_BIT,B.NEAREST):Li?B.copyTexSubImage3D(Pt,St,Ct,re,Pe+vn,It,Ht,Rt,xt):B.copyTexSubImage2D(Pt,St,Ct,re,It,Ht,Rt,xt);vt.bindFramebuffer(B.READ_FRAMEBUFFER,null),vt.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else Li?M.isDataTexture||M.isData3DTexture?B.texSubImage3D(Pt,St,Ct,re,Pe,Rt,xt,wt,_e,Xe,ve.data):F.isCompressedArrayTexture?B.compressedTexSubImage3D(Pt,St,Ct,re,Pe,Rt,xt,wt,_e,ve.data):B.texSubImage3D(Pt,St,Ct,re,Pe,Rt,xt,wt,_e,Xe,ve):M.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,St,Ct,re,Rt,xt,_e,Xe,ve.data):M.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,St,Ct,re,ve.width,ve.height,_e,ve.data):B.texSubImage2D(B.TEXTURE_2D,St,Ct,re,Rt,xt,_e,Xe,ve);vt.pixelStorei(B.UNPACK_ROW_LENGTH,Qe),vt.pixelStorei(B.UNPACK_IMAGE_HEIGHT,ue),vt.pixelStorei(B.UNPACK_SKIP_PIXELS,Pi),vt.pixelStorei(B.UNPACK_SKIP_ROWS,qe),vt.pixelStorei(B.UNPACK_SKIP_IMAGES,ur),St===0&&F.generateMipmaps===!0&&F.mipmapsAutoUpdate===!0&&B.generateMipmap(Pt),vt.unbindTexture()},this.initRenderTarget=function(M){Bt.get(M).__webglFramebuffer===void 0&&Gt.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Gt.setTextureCube(M,0):M.isData3DTexture?Gt.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Gt.setTexture2DArray(M,0):Gt.setTexture2D(M,0),vt.unbindTexture()},this.resetState=function(){Z=0,G=0,rt=null,vt.reset(),ft.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=ae._getDrawingBufferColorSpace(t),e.unpackColorSpace=ae._getUnpackColorSpace()}}function mx(i,t=!1){const e=i[0].index!==null,n=new Set(Object.keys(i[0].attributes)),s=new Set(Object.keys(i[0].morphAttributes)),r={},a={},o=i[0].morphTargetsRelative,l=new Ae;l.morphTargetsRelative=o;let c=0;for(let h=0;h<i.length;++h){const f=i[h];let d=0,u=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const p in f.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(f.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const p in f.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(f.morphAttributes[p].length!==i[0].morphAttributes[p].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+p+'" morph attribute.'),null;a[p]===void 0&&(a[p]=[]),a[p].push(f.morphAttributes[p]),u++}if(u!==s.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(t){let p;if(e)p=f.index.count;else if(f.attributes.position!==void 0)p=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(e){let h=0;const f=[];for(let d=0;d<i.length;++d){const u=i[d].index;for(let p=0;p<u.count;++p)f.push(u.getX(p)+h);h+=i[d].attributes.position.count}l.setIndex(f)}for(const h in r){const f=gh(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(const h in a){const f=a[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<f;++d){const u=[];for(let y=0;y<a[h].length;++y)u.push(a[h][y][d]);const p=gh(u);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}}return l}function gh(i){let t,e,n,s=-1,r=0;for(let c=0;c<i.length;++c){const h=i[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new gn(a,e,n);let l=0;for(let c=0;c<i.length;++c){const h=i[c];if(h.isInterleavedBufferAttribute){const f=l/e;for(let d=0,u=h.count;d<u;d++)for(let p=0;p<e;p++){const y=h.getComponent(d,p);o.setComponent(d+f,p,y)}}else a.set(h.array,l);l+=h.count*e}return s!==void 0&&(o.gpuType=s),o}const gx=["down","left","right","up"];function _x(i,t=4){return new Promise((e,n)=>{const s=new Image;s.onload=()=>{const r=document.createElement("canvas");r.width=s.naturalWidth*t,r.height=s.naturalHeight*t,r.getContext("2d").drawImage(s,0,0,r.width,r.height);const a=new ga(r);a.colorSpace=Ve,a.magFilter=sn,a.minFilter=ei,e(a)},s.onerror=()=>n(new Error(`無法載入素材 ${i}`)),s.src=i})}class Pu{constructor(t,e,n,s,r){this.cols=e,this.rows=n,this.tex=t.clone(),this.tex.needsUpdate=!0,this.tex.repeat.set(1/e,1/n),this.sprite=new nu(new Ll({map:this.tex,transparent:!0,alphaTest:.1})),this.sprite.center.set(.5,0),this.sprite.scale.set(s,r,1)}cols;rows;sprite;tex;setSheet(t){const{x:e,y:n}=this.tex.offset;this.tex=t.clone(),this.tex.needsUpdate=!0,this.tex.repeat.set(1/this.cols,1/this.rows),this.tex.offset.set(e,n),this.sprite.material.map=this.tex}frame(t,e){this.tex.offset.set(t/this.cols,1-(e+1)/this.rows)}}class xx{constructor(t,e){this.sheets=t,this.role=e,this.body=new Pu(t[e],3,4,32,45);const n=new qt(new _a(11,16),new Si({color:0,transparent:!0,opacity:.22,depthWrite:!1}));n.rotation.x=-Math.PI/2,n.position.y=.6;const s=new qt(new xa(15,18,24),new Si({color:16777215,transparent:!0,opacity:.9,depthWrite:!1}));s.rotation.x=-Math.PI/2,s.position.y=.8,this.group.add(n,s,this.body.sprite),this.body.frame(0,0)}sheets;role;group=new he;body;facing="down";walking=!1;setRole(t){this.role=t,this.body.setSheet(this.sheets[t])}update(t,e,n,s){this.walking=t,this.facing=e;const r=gx.indexOf(this.facing);if(this.walking&&!n){const a=[1,0,2,0][Math.floor(s/125)%4];this.body.frame(a,r)}else this.body.frame(0,r)}get role_(){return this.role}}const pn={R:112},vx={hospital:18,plaza:9,home:0},Bn=-26,yx=pn.R*1.5,_h=pn.R*Math.sqrt(3),Sx=(i,t)=>({x:i*yx,y:t*_h+(i%2?_h/2:0)}),Mx=[["decor-hospital",2,0,"hospital"],["admission",1,0,"hospital"],["ward",0,1,"hospital"],["team",0,2,"hospital"],["discharge-prep",1,2,"hospital"],["discharge",2,3,"hospital"],["decor-garden",1,1,"hospital"],["decor-ambulance",2,1,"hospital"],["decor-park",2,2,"hospital"],["decor-heart",3,1,"plaza"],["decor-hill",3,2,"plaza"],["home-care",3,3,"plaza"],["weight",4,3,"home"],["medication",5,2,"home"],["diet",6,2,"home"],["activity",6,1,"home"],["warning",5,0,"home"],["follow-up",4,0,"home"],["long-term-care",4,1,"home"],["palliative",5,1,"home"],["advanced-hf",4,2,"home"]],rn=Mx.map(([i,t,e,n])=>({id:i,q:t,r:e,...Sx(t,e),look:n,zone:n==="home"?"home":"hospital"})),mn=i=>{const t=rn.find(e=>e.id===i);if(!t)throw new Error(`找不到島 ${i}`);return t},_n=i=>vx[i.look],cl=[[-58,70],[58,70],[-24,84],[24,84]];function xh(i,t){return i.q===t.q?Math.abs(i.r-t.r)===1:Math.abs(i.q-t.q)!==1?!1:i.q%2===1?t.r===i.r||t.r===i.r+1:t.r===i.r||t.r===i.r-1}const xe={},Gl={},Oi=[],Lu=[["",0,56],[":L",-80,12],[":R",80,12],[":BL",-46,-72],[":BR",46,-72]];for(const i of rn){for(const[t,e,n]of Lu)xe[i.id+t]={x:i.x+e,y:i.y+n},Gl[i.id+t]=_n(i);for(const[t,e]of[["",":L"],["",":R"],[":L",":BL"],[":R",":BR"],[":BL",":BR"]])Oi.push({a:i.id+t,b:i.id+e,kind:"path"})}const vh=(i,t,e)=>Lu.map(([n])=>i.id+n).sort((n,s)=>Math.hypot(xe[n].x-t,xe[n].y-e)-Math.hypot(xe[s].x-t,xe[s].y-e))[0];for(let i=0;i<rn.length;i++)for(let t=i+1;t<rn.length;t++){const e=rn[i],n=rn[t];if(!xh(e,n)&&!xh(n,e))continue;const s=`gate:${e.id}|${n.id}`,r=(e.x+n.x)/2,a=(e.y+n.y)/2;xe[s]={x:r,y:a},Gl[s]=(_n(e)+_n(n))/2,Oi.push({a:vh(e,r,a),b:s,kind:"link"},{a:s,b:vh(n,r,a),kind:"link"})}const yh="decor-hospital",bx=i=>({x:i.x,y:i.y-30,h:_n(i)+70}),Ex=[{zone:"hospital",title:"住院區",sub:"醫護人員可查看規範",x:180,y:-190,h:30},{zone:"home",title:"居家區",sub:"病友與家屬的照護練習",x:840,y:-190,h:20}],so=[[-260,200],[-200,600],[200,860],[504,980],[820,860],[1220,600],[1270,200],[1e3,-230],[504,-120],[0,-230]],Dn=(()=>{const i=rn.map(s=>s.x),t=rn.map(s=>s.y),e=Math.min(...i)-pn.R,n=Math.min(...t)-pn.R;return{x:e,y:n,w:Math.max(...i)+pn.R-e,h:Math.max(...t)+pn.R-n}})();function ze(i,t={}){return new Vn({color:i,flatShading:!0,roughness:.85,metalness:0,...t})}function Pn(i,t={}){return i.position.set(t.x??0,t.y??0,t.z??0),t.ry&&(i.rotation.y=t.ry),i}function Te(i,t,e={},n=!0){const s=Pn(new qt(i,ze(t)),e);return s.castShadow=n,s.receiveShadow=!0,s}function At(i,t,e,n,s={}){const r=new Cn(i,t,e);return r.translate(0,t/2,0),Te(r,n,s)}function de(i,t,e,n,s,r={}){const a=new ai(i,t,e,n);return a.translate(0,e/2,0),Te(a,s,r)}function Iu(i,t,e,n,s={}){const r=new Ti;r.moveTo(-t/2-3,0),r.lineTo(t/2+3,0),r.lineTo(0,e),r.lineTo(-t/2-3,0);const a=new sr(r,{depth:i+6,bevelEnabled:!1});return a.translate(0,0,-(i+6)/2),a.rotateY(Math.PI/2),Te(a,n,s)}function Hr(i,t,e,n={}){const s=new An(i*.75,t,4);return s.rotateY(Math.PI/4),s.translate(0,t/2,0),Te(s,e,n)}function Un(i,t,e,n,s,r,a={},o=8){const l=new he,c=r==="front"?i:t;for(const h of e)for(let f=0;f<n;f++){const d=-c/2+(f+.5)*c/n,u=At(r==="front"?o:1.2,o,r==="front"?1.2:o,s,r==="front"?{x:d,y:h,z:t/2+.4}:{x:i/2+.4,y:h,z:d});u.castShadow=!1,u.userData.glow=!0,l.add(u)}return Pn(l,a)}function Nn(i,t,e,n,s,r={},a="#a46f45"){const o=new he;return o.add(At(i,t,e,n)),o.add(Iu(i,e,Math.min(i,e)*.45,s,{y:t})),o.add(At(i*.18,t*.6,1.4,a,{x:-i*.2,z:e/2+.3})),o.add(Un(i,e,[t*.45],1,"#ffe7a6","front",{x:i*.22},Math.min(9,t*.3))),o.add(Un(i,e,[t*.45],1,"#cfe8f3","right",{},Math.min(9,t*.3))),Pn(o,r)}function Je(i,t={},e=1,n=i==="pine"?"#4f8f5b":"#5f9e4f"){const s=new he;return s.add(de(2.2*e,2.8*e,12*e,5,"#8a5a3b")),i==="pine"?(s.add(Te(new An(13*e,22*e,6).translate(0,22*e,0),n)),s.add(Te(new An(10*e,18*e,6).translate(0,32*e,0),n))):s.add(Te(new en(13*e,0).translate(0,23*e,0),n)),Pn(s,t)}function Os(i={},t="#78b35e"){return Te(new en(6,0).scale(1.2,.7,1).translate(0,3,0),t,i)}function Ze(i={}){const t=new he;return["#f4a7b9","#ffd166","#c3a6ff","#ffffff","#f28f8f"].forEach((e,n)=>t.add(Te(new en(2,0).translate(-8+n*4,1.5,n%2*3),e,{},!1))),Pn(t,i)}function gi(i={}){const t=new he;return t.add(At(18,2,6,"#c98b5a",{y:5})),t.add(At(18,5,1.5,"#b97b4c",{y:7,z:-2.5})),t.add(At(2,5,5,"#6b5b4c",{x:-7}),At(2,5,5,"#6b5b4c",{x:7})),Pn(t,i)}function Qn(i,t={}){const e=new he;return e.add(de(3.6,4.4,11,7,i)),e.add(Te(new en(4,1).translate(0,15,0),"#f5d0b5")),Pn(e,t)}function _i(i={}){const t=new he;t.add(de(.9,1.1,22,5,"#4b5563"));const e=Te(new en(3,0).translate(0,24,0),"#fff1b8",{},!1);return e.userData.glow=!0,t.add(e),Pn(t,i)}function wx(i){return Me(de(2.6,3.2,8,6,i),Te(new en(3,0).translate(0,11,0),"#f5d0b5"))}function Tx(i,t="#ffffff",e="#2f7f78"){const n=document.createElement("canvas");n.width=512,n.height=128;const s=n.getContext("2d");s.fillStyle=t,s.beginPath(),s.roundRect(4,4,504,120,40),s.fill(),s.strokeStyle=e,s.lineWidth=8,s.stroke(),s.fillStyle=e,s.font='bold 64px system-ui, "PingFang TC", "Noto Sans TC", sans-serif',s.textAlign="center",s.textBaseline="middle",s.fillText(i,256,68);const r=new ga(n);return r.colorSpace=Ve,r}function Ax(i){const t=new Ti;return t.moveTo(0,-10*i),t.bezierCurveTo(-16*i,2*i,-10*i,14*i,0,7*i),t.bezierCurveTo(10*i,14*i,16*i,2*i,0,-10*i),t}const ro=new Map;function Du(i,t="#3e8c86"){const e=`${i}|${t}`;if(ro.has(e))return ro.get(e);const n=document.createElement("canvas");n.width=n.height=128;const s=n.getContext("2d");s.fillStyle="#ffffff",s.strokeStyle=t,s.lineWidth=8,s.beginPath(),s.roundRect(8,8,112,112,26),s.fill(),s.stroke(),s.fillStyle=t,s.strokeStyle=t,s.lineCap="round",s.lineJoin="round";const r=(o,l,c)=>{s.beginPath(),s.moveTo(o,l+22*c),s.bezierCurveTo(o-40*c,l-4*c,o-22*c,l-34*c,o,l-14*c),s.bezierCurveTo(o+22*c,l-34*c,o+40*c,l-4*c,o,l+22*c),s.fill()};switch(i){case"heart":r(64,66,1.1);break;case"leaf":r(64,66,1.1);break;case"bed":s.fillRect(28,64,72,14),s.fillRect(28,50,22,14),s.fillRect(26,44,7,48),s.fillRect(95,66,7,26);break;case"pill":s.save(),s.translate(64,64),s.rotate(-.7),s.lineWidth=7,s.beginPath(),s.roundRect(-34,-14,68,28,14),s.stroke(),s.beginPath(),s.roundRect(0,-14,34,28,[0,14,14,0]),s.fill(),s.restore();break;case"clock":s.lineWidth=7,s.beginPath(),s.arc(64,64,34,0,Math.PI*2),s.stroke(),s.beginPath(),s.moveTo(64,64),s.lineTo(64,40),s.moveTo(64,64),s.lineTo(82,72),s.stroke();break;case"phone":s.beginPath(),s.moveTo(42,34),s.quadraticCurveTo(50,28,56,40),s.lineTo(50,50),s.quadraticCurveTo(58,68,76,78),s.lineTo(86,72),s.quadraticCurveTo(98,78,92,88),s.quadraticCurveTo(62,100,40,66),s.quadraticCurveTo(30,46,42,34),s.fill();break;case"check":s.lineWidth=7;for(const o of[40,64,88])s.beginPath(),s.moveTo(30,o),s.lineTo(38,o+7),s.lineTo(50,o-7),s.stroke(),s.fillRect(58,o-3,40,6);break;case"H":s.font="bold 76px system-ui, sans-serif",s.textAlign="center",s.textBaseline="middle",s.fillText("H",64,68);break;case"battery":s.lineWidth=7,s.strokeRect(26,42,70,44),s.fillRect(96,54,8,20),s.fillStyle="#6bbf74",s.fillRect(34,50,24,28),s.fillRect(62,50,24,28);break;case"scale":s.lineWidth=7,s.beginPath(),s.roundRect(28,36,72,56,10),s.stroke(),s.beginPath(),s.arc(64,58,12,Math.PI,0),s.stroke();break;case"card":s.lineWidth=6,s.strokeRect(30,32,68,64);for(const o of[50,64,78])s.fillRect(40,o,48,5);break}const a=new ga(n);return a.colorSpace=Ve,a.anisotropy=4,ro.set(e,a),a}function us(i,t,e={},n=26,s=18){const r=new he;r.add(de(1.2,1.2,n,5,"#6b4529"));const a=new qt(new Ri(s,s),new Vn({map:Du(i,t),roughness:.9}));return a.position.set(0,n+s/2-2,1.4),a.rotation.x=-.2,r.add(a),Pn(r,e)}function Fi(i,t,e={},n=18){const s=new qt(new Ri(n,n),new Vn({map:Du(i,t),roughness:.9}));return s.rotation.x=-.55,Pn(s,e)}function Sh(i,t={}){const e=new he;e.add(de(.9,.9,40,5,"#6b5b4c"));const n=new Ti;n.moveTo(0,0),n.lineTo(16,-5),n.lineTo(0,-10);const s=new qt(new rr(n),new Vn({color:i,side:nn,flatShading:!0}));return s.position.set(1,40,0),e.add(s),Pn(e,t)}const Me=(...i)=>{const t=new he;return t.add(...i),t},Rx={admission:()=>Me(At(84,44,50,"#fbf7ef",{x:-12,z:-26}),At(88,6,54,"#4fa7a0",{x:-12,y:44,z:-26}),Un(84,50,[12,28],5,"#cfe8f3","front",{x:-12,z:-26}),Un(84,50,[12,28],3,"#cfe8f3","right",{x:-12,z:-26}),Fi("heart","#4fa7a0",{x:-12,y:64,z:-14},22),At(30,3,14,"#f4c95d",{x:-22,y:22,z:6}),de(1.2,1.2,22,5,"#999",{x:-34,z:11}),de(1.2,1.2,22,5,"#999",{x:-10,z:11}),Nn(24,20,20,"#fff8ec","#e98a63",{x:46,z:12}),gi({x:22,z:30}),Ze({x:-50,z:34}),Ze({x:-24,z:40})),ward:()=>Me(At(100,38,42,"#f7fbfd",{x:-6,z:-30}),At(104,5,46,"#7cc3d6",{x:-6,y:38,z:-30}),Un(100,42,[10,25],6,"#ffe9b8","front",{x:-6,z:-30}),Un(100,42,[10,25],2,"#cfe8f3","right",{x:-6,z:-30}),Fi("bed","#5ea6ba",{x:-6,y:56,z:-18},22),At(56,2.5,12,"#f4c95d",{x:24,y:20,z:6}),...[0,26,52].map(i=>de(1.2,1.2,20,5,"#999",{x:-2+i,z:10})),Os({x:-46,z:10}),Ze({x:-30,z:30})),team:()=>Me(At(56,30,56,"#fffaf0",{z:-18}),Hr(56,30,"#e88c66",{y:30,z:-18}),At(10,18,1.4,"#6ca3d6",{x:-14,z:10.3}),At(10,18,1.4,"#82c29e",{x:14,z:10.3}),At(1.4,18,10,"#f2a07c",{x:28.3,z:-26}),At(1.4,18,10,"#a184c8",{x:28.3,z:-8}),Qn("#6ca3d6",{x:-40,z:18}),Qn("#82c29e",{x:-26,z:32}),Qn("#f2a07c",{x:30,z:30}),Qn("#a184c8",{x:44,z:16})),"discharge-prep":()=>Me(Nn(76,34,48,"#f8fcf5","#6fae8b",{x:-8,z:-24}),us("check","#5a9374",{x:46,z:4},22,20),Ze({x:-40,z:26}),Os({x:30,z:30})),discharge:()=>{const i=Me(Nn(52,28,40,"#f6fbff","#5a8fc2",{x:26,z:-22})),t=new he;t.add(At(90,4,24,"#c98f5a",{y:-2}));for(let e=0;e<9;e++)t.add(At(1,.6,24,"#8d5f39",{x:-44+e*11,y:2}));for(const e of[-42,0,42])t.add(de(2.4,2.4,22,6,"#7d5434",{x:e,y:-20,z:13}));return t.position.set(-74,0,22),t.rotation.y=.5,i.add(t),i.add(At(12,16,8,"#f28f8f",{x:-6,z:14}),At(10,10,8,"#ffd166",{x:8,z:18})),i.add(us("card","#46769f",{x:58,z:6},18,16)),i},weight:()=>Me(Nn(60,30,46,"#fff4e2","#d9734e",{z:-22}),At(7,14,7,"#b08c74",{x:14,y:34,z:-30}),At(14,2.5,12,"#e6eef3",{x:-38,z:14}),us("card","#e88c66",{x:40,z:8},16,16),Os({x:-46,z:-6}),Ze({x:26,z:28})),medication:()=>{const i=Me(Nn(58,28,44,"#fffaf5","#f2a07c",{z:-22}));return i.add(At(60,2,14,"#f28f8f",{y:22,z:6})),i.add(us("pill","#c86c49",{x:44,z:8},22,18)),["#f28f8f","#ffd166","#82c29e","#6ca3d6","#a184c8","#f2a07c","#7cc3d6"].forEach((t,e)=>i.add(At(4,3,5,t,{x:-40+e*5,z:18}))),i},diet:()=>Me(Nn(54,28,42,"#fffdf2","#ffd166",{x:18,z:-26}),At(36,2,22,"#ffffff",{x:-26,y:12,z:10}),...[-38,-14].map(i=>de(1.2,1.2,12,5,"#bbb",{x:i,z:10})),Te(new en(3.5,0).translate(-32,16,8),"#82c29e"),Te(new en(3,0).translate(-24,16,12),"#f28f8f"),Te(new en(2.6,0).translate(-18,16,6),"#ffd166"),At(6,8,6,"#c98b5a",{x:-48,z:12}),At(6,8,6,"#c98b5a",{x:-4,z:12}),...[0,1,2,3].map(i=>Te(new en(4,0).translate(44+i%2*8,4,8+i*6),"#5f9e4f"))),activity:()=>{const i=Te(new An(58,34,7).translate(0,17,0),"#8cc06a",{x:-6,z:-20}),t=Me(...[[-8,-8],[8,-8],[-8,8],[8,8]].map(([e,n])=>de(1,1,16,5,"#a98467",{x:e,z:n})),Hr(22,12,"#e88c66",{y:16}));return t.position.set(-6,30,-20),Me(i,t,us("check","#a86d42",{x:46,z:6},18,14),gi({x:-40,z:22}),Je("round",{x:40,z:-30},.8),Ze({x:10,z:30}))},warning:()=>{const i=new he,t=6,e=16;for(let s=0;s<t;s++){const r=15-s*1.4,a=15-(s+1)*1.4;i.add(de(a,r,e,10,s%2?"#ffffff":"#ef8354",{y:s*e,z:-16}))}i.add(de(10,10,4,10,"#3b3a36",{y:t*e,z:-16}));const n=de(7,7,12,10,"#fff3b0",{y:t*e+4,z:-16});return n.material.emissive=new Kt("#ffe58a"),n.material.emissiveIntensity=.8,n.name="lamp",i.add(n,Te(new An(10,10,10).translate(0,t*e+21,-16),"#ef8354")),i.add(Nn(30,20,26,"#fbf7ef","#4f86c6",{x:38,z:-4})),i.add(us("phone","#3d6fa8",{x:-36,z:10},22,18)),i},"follow-up":()=>Me(At(110,5,26,"#e6dfcf",{x:0,z:16}),Nn(48,28,34,"#f6fbff","#4f86c6",{x:18,y:5,z:-24}),At(14,64,14,"#fffaf0",{x:-36,z:-22}),Hr(14,12,"#4f86c6",{x:-36,y:64,z:-22}),Fi("clock","#3b3a36",{x:-36,y:52,z:-14.6},13),At(40,16,14,"#ffd166",{x:-10,y:5,z:18}),Un(40,14,[12],4,"#e6f4ff","front",{x:-10,y:5,z:18},6)),"long-term-care":()=>Me(Nn(44,24,36,"#f6f1ff","#8c6bb1",{x:-24,z:-24}),At(14,3,24,"#d8d2c4",{x:-48,z:4}),Nn(38,22,30,"#fff8ec","#6fae8b",{x:24,z:-32}),At(32,2,12,"#f4c95d",{x:40,y:20,z:10}),de(1,1,20,5,"#888",{x:28,z:14}),de(1,1,20,5,"#888",{x:52,z:14}),At(30,14,16,"#ffffff",{x:6,z:18}),Un(30,16,[8],2,"#7fb7d8","front",{x:6,z:18},5),de(.9,.9,24,5,"#6b5b4c",{x:-50,z:24}),Te(new An(16,8,8).translate(-50,26,24),"#ef8354"),gi({x:-36,z:34})),palliative:()=>Me(At(90,6,4,"#e9dcc6",{x:0,z:40}),At(4,6,70,"#dccbb0",{x:45,z:5}),...[[-20,-24],[20,-24],[-20,4],[20,4]].map(([i,t])=>de(1.4,1.4,34,5,"#a98467",{x:i,z:t})),...[0,1,2,3,4,5,6].map(i=>At(2,2,34,"#a98467",{x:-20+i*6.66,y:34,z:-10})),Te(new en(8,0).scale(1.6,.5,1).translate(-12,38,-18),"#8fc27a"),At(10,10,10,"#f6e7cf",{z:-10}),At(9,7,9,"#9fc9e8",{x:-16,z:-10}),At(9,7,9,"#f4a7b9",{x:16,z:-10}),de(14,14,1.5,12,"#bfe3ef",{x:-40,z:16}),Ze({x:10,z:26}),Ze({x:-30,z:-36})),"advanced-hf":()=>Me(At(46,36,40,"#eef7ff",{x:-34,z:-20}),At(48,6,42,"#4f86c6",{x:-34,y:36,z:-20}),Fi("battery","#3d6fa8",{x:-34,y:54,z:-10},20),At(12,22,1.4,"#4f86c6",{x:-34,z:.4}),At(44,32,38,"#fff4f4",{x:32,z:-26}),At(46,6,40,"#e27c7c",{x:32,y:32,z:-26}),Fi("heart","#c86464",{x:32,y:50,z:-16},20),At(12,20,1.4,"#d26d6d",{x:32,z:-6.6}),At(22,16,14,"#fbf7ef",{x:0,z:-20}),Sh("#4f86c6",{x:-62,z:16}),Sh("#e27c7c",{x:62,z:14})),"decor-garden":()=>Me(de(16,18,4,10,"#d9d2c4"),de(13,13,1,10,"#9fd8ea",{y:4}),de(3,4,12,8,"#d9d2c4",{y:4}),de(6,6,2,8,"#bfe6f2",{y:14}),gi({x:-36,z:20,ry:.4}),gi({x:36,z:20,ry:-.4}),Ze({x:-30,z:-30}),Ze({x:30,z:-34}),Ze({x:0,z:44}),Je("round",{x:-62,z:-20},.9),Je("round",{x:62,z:-16},.85,"#6aa956"),Je("pine",{x:0,z:-66},.9),_i({x:-22,z:34}),_i({x:22,z:34}),Qn("#f2a07c",{x:-14,z:26}),Qn("#7cc3d6",{x:48,z:40})),"decor-ambulance":()=>Me(At(56,26,36,"#f3f6f8",{x:-20,z:-36}),At(58,4,38,"#7cc3d6",{x:-20,y:26,z:-36}),At(30,18,1.2,"#cfd8dc",{x:-20,z:-17.6}),At(34,16,16,"#ffffff",{x:30,z:6}),At(34,3,16.4,"#ef8354",{x:30,y:7}),At(10,12,15,"#cfe8f3",{x:44,y:2,z:.2}),Te(new en(2.4,0).translate(24,18,6),"#7cc3ff"),...[-30,-10,10].map(i=>At(1.5,.4,26,"#ffffff",{x:i,z:30})),de(24,24,.8,16,"#9aa5ad",{x:-30,z:40}),Fi("H","#4b5563",{x:-30,y:1.2,z:40},26),_i({x:58,z:40})),"decor-park":()=>Me(de(30,30,1.2,9,"#8fd3e2",{x:-10,z:6}),Je("round",{x:-60,z:-30},1),Je("pine",{x:-30,z:-60},.95),Je("round",{x:30,z:-50},.9,"#6aa956"),Je("pine",{x:60,z:-10},.9),Je("round",{x:50,z:40},.75),gi({x:-10,z:46}),_i({x:26,z:30}),Os({x:-50,z:30}),Ze({x:10,z:-24}),Qn("#a184c8",{x:24,z:16})),"decor-heart":()=>{const i=new qt(new sr(Ax(2.2),{depth:8,bevelEnabled:!0,bevelSize:2,bevelThickness:2,bevelSegments:1}),ze("#ef5f67",{emissive:"#ef5f67",emissiveIntensity:.15}));return i.position.set(0,46,-10),i.castShadow=!0,i.name="heart",i.userData.keep=!0,Me(de(26,30,6,12,"#efe6d6"),de(14,16,22,8,"#fbf7ef",{y:6}),i,...[0,1,2,3,4,5].map(t=>Ze({x:Math.cos(t)*44,z:Math.sin(t)*34+8})),gi({x:-50,z:30,ry:.6}),gi({x:50,z:30,ry:-.6}),_i({x:-34,z:-40}),_i({x:34,z:-40}),Qn("#82c29e",{x:-26,z:44}),Qn("#f4a7b9",{x:32,z:52}))},"decor-hill":()=>{const i=Te(new An(70,46,8).translate(0,23,0),"#9fcf73",{z:-14}),t=new he;t.add(de(5,8,34,6,"#fffaf0"),Hr(12,8,"#c86c49",{y:34}));const e=new he;e.name="windmill",e.userData.keep=!0;for(let n=0;n<4;n++){const s=new qt(new Cn(3,26,.8).translate(0,13,0),ze("#ffffff"));s.rotation.z=n*Math.PI/2,s.userData.keep=!0,e.add(s)}return e.position.set(0,30,7),t.add(e),t.position.set(0,44,-14),Me(i,t,Je("pine",{x:-58,z:20},.85),Je("pine",{x:60,z:16},.9),Je("round",{x:-30,z:46},.7),Os({x:34,z:50}))},"home-care":()=>{const i=new qt(new Ri(56,14),new Vn({map:Tx("返家照護站"),roughness:.9}));return i.position.set(0,44,.8),Me(At(8,40,8,"#c98f5a",{x:-32}),At(8,40,8,"#c98f5a",{x:32}),At(76,7,10,"#a86d42",{y:37}),i,...[0,1,2,3].map(t=>At(26,1.2,12,"#f3e6c4",{y:.2,z:20+t*14})),Ze({x:-50,z:10}),Ze({x:50,z:10}),_i({x:-44,z:40}),_i({x:44,z:40}),Je("round",{x:-66,z:-30},.8),Je("round",{x:66,z:-30},.8,"#6aa956"))},"decor-hospital":()=>Me(At(52,110,46,"#fbfbf7",{x:0,z:-14}),At(54,5,48,"#4fa7a0",{x:0,y:110,z:-14}),Un(52,46,[14,30,46,62,78,94],4,"#cfe8f3","front",{z:-14},7),Un(52,46,[14,30,46,62,78,94],3,"#cfe8f3","right",{z:-14},7),Fi("H","#3e8c86",{y:118,z:-6},24),At(18,22,2,"#7fb7d8",{z:9.5}),Je("round",{x:-44,z:10},.9),Je("round",{x:44,z:6},.8,"#6aa956"),Ze({x:-20,z:34}))},Cx=["#f2a07c","#6ca3d6","#82c29e","#a184c8"];function Px(i){return Me(At(18,13,16,"#fffdf8"),Iu(18,16,8,Cx[i%4],{y:13}),At(5,8,1,"#a46f45",{x:-3,z:8.2}))}const ao=new Map;function Lx(i){if(!ao.has(i)){const e=document.createElement("canvas");e.width=e.height=64;const n=e.getContext("2d");n.fillStyle="#ffffff",n.strokeStyle="#2f7f78",n.lineWidth=6,n.beginPath(),n.arc(32,32,26,0,Math.PI*2),n.fill(),n.stroke(),n.fillStyle="#2f7f78",n.font="bold 34px system-ui, sans-serif",n.textAlign="center",n.textBaseline="middle",n.fillText(String(i),32,34);const s=new ga(e);s.colorSpace=Ve,ao.set(i,new Ll({map:s,depthTest:!1}))}const t=new nu(ao.get(i));return t.scale.set(11,11,1),t.renderOrder=10,t}function Ix(){const i=new Ti;i.moveTo(-22,0),i.lineTo(22,0),i.lineTo(14,-9),i.lineTo(-16,-9),i.lineTo(-22,0);const t=new qt(new sr(i,{depth:14,bevelEnabled:!1}).translate(0,9,-7),ze("#ffffff"));t.castShadow=!0;const e=new Ti;e.moveTo(0,0),e.lineTo(16,0),e.lineTo(0,26);const n=new qt(new rr(e),new Vn({color:"#fff3d6",side:nn,flatShading:!0}));n.position.set(1,12,0);const s=n.clone();return s.material=new Vn({color:"#ef8354",side:nn}),s.scale.set(-.8,.8,1),Me(t,At(44,2,14,"#4f86c6",{y:8}),de(.8,.8,38,5,"#6b5b4c",{y:9}),n,s)}const Nu=(i,t)=>Math.hypot(t.x-i.x,t.y-i.y);function Dx(i){const t=new Map;for(const e of Object.keys(i.nodes))t.set(e,[]);for(const{a:e,b:n}of i.edges){if(!t.has(e)||!t.has(n))throw new Error(`步道連線 ${e}–${n} 指向不存在的節點`);t.get(e).push(n),t.get(n).push(e)}return t}function hl(i,t,e){if(!(t in i.nodes)||!(e in i.nodes))return null;if(t===e)return[t];const n=Dx(i),s=new Map([[t,0]]),r=new Map,a=new Set([t]),o=new Set;for(;a.size;){let c="",h=1/0;for(const f of a)(s.get(f)??1/0)<h&&(h=s.get(f),c=f);if(a.delete(c),c===e)break;o.add(c);for(const f of n.get(c)??[]){if(o.has(f))continue;const d=h+Nu(i.nodes[c],i.nodes[f]);d<(s.get(f)??1/0)&&(s.set(f,d),r.set(f,c),a.add(f))}}if(!r.has(e))return null;const l=[e];for(;l[0]!==t;)l.unshift(r.get(l[0]));return l}function Uu(i,t,e="down"){return Math.abs(i)<.001&&Math.abs(t)<.001?e:Math.abs(i)>=Math.abs(t)?i>=0?"right":"left":t>=0?"down":"up"}class Nx{constructor(t,e,n=170,s=()=>{}){if(this.graph=t,this.speed=n,this.onEvent=s,!(e in t.nodes))throw new Error(`起點 ${e} 不在路網中`);this.node=e,this.pos={...t.nodes[e]}}graph;speed;onEvent;pos;facing="down";node;segFrom=null;segTo=null;queue=[];target=null;pending=null;get moving(){return this.segTo!==null}get destination(){return(this.pending??this.target)?.stationId??null}get segment(){return this.segTo?{from:this.segFrom,to:this.segTo}:null}teleport(t){this.segFrom=this.segTo=null,this.queue=[],this.target=this.pending=null,this.node=t,this.pos={...this.graph.nodes[t]}}goTo(t,e,n={}){const s={stationId:t,nodeId:e},r=this.destination;if(n.instant){r&&r!==t&&this.onEvent({type:"retarget",from:r,to:t}),this.teleport(e),this.onEvent({type:"arrive",stationId:t});return}if(this.moving){if(r===t)return;r&&this.onEvent({type:"retarget",from:r,to:t}),this.queue=[],this.pending=s,this.target=null;return}this.target=s,this.onEvent({type:"depart",stationId:t}),this.plan(this.node)}plan(t){const e=this.target,n=hl(this.graph,t,e.nodeId);if(!n)throw new Error(`找不到從 ${t} 到 ${e.nodeId} 的步道`);this.queue=n.slice(1),this.nextSegment()}nextSegment(){if(this.queue.length===0){const n=this.target;this.target=null,this.segFrom=this.segTo=null,this.onEvent({type:"arrive",stationId:n.stationId});return}this.segFrom=this.node,this.segTo=this.queue.shift(),this.node=null;const t=this.graph.nodes[this.segFrom],e=this.graph.nodes[this.segTo];this.facing=Uu(e.x-t.x,e.y-t.y,this.facing)}update(t){let e=this.speed*t/1e3;for(;this.segTo&&e>0;){const n=this.graph.nodes[this.segTo],s=Nu(this.pos,n);s>e?(this.pos.x+=(n.x-this.pos.x)/s*e,this.pos.y+=(n.y-this.pos.y)/s*e,e=0):(e-=s,this.pos={...n},this.node=this.segTo,this.segFrom=this.segTo=null,this.pending?(this.target=this.pending,this.pending=null,this.plan(this.node)):this.target&&this.nextSegment())}}}const jn={cat:{tile:"decor-hospital",dx:34,dz:18,yaw:-.45,near:90,scale:2},dog:{tile:"home-care",dx:-20,dz:20,yaw:.3,near:100,scale:1.95},fish:{x:392,y:736,rx:20,ry:11,count:8},turtle:{x:900,y:830,rx:120,ry:55}},Mh={morning:{color:"#fff8f0",opacity:1},day:{color:"#ffffff",opacity:1},night:{color:"#c9daff",opacity:.7}},Bs={morning:{color:"#2f5f6b",opacity:.6},day:{color:"#164f62",opacity:.62},night:{color:"#0b2236",opacity:.7}},He=(i,t,e=1,n=1,s=1)=>{const r=new qt(new en(i,1).scale(e,n,s),ze(t));return r.castShadow=!0,r},Fn=(i,t,e,n)=>(i.position.set(t,e,n),i),ul=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-e*n));class Ux{constructor(t,e,n,s,r){this.near=r;const a="#f0a254",o="#fff6ea",l="#3b2a2a";this.yaw0=s,this.group.position.set(t,e,n),this.group.rotation.y=s,this.group.add(Fn(He(1,a,5.4,6.6,6.4),0,6.2,-.5)),this.group.add(Fn(He(1,o,3.4,4.6,2),0,6.8,4.3)),this.group.add(Fn(He(1,a,2.6,.9,2),-3.2,6.8,-.5)),this.group.add(Fn(He(1,o,1.4,1,1.8),-1.8,.9,4.6),Fn(He(1,o,1.4,1,1.8),1.8,.9,4.6)),this.head.position.set(0,14.2,1.6),this.head.add(He(4.6,a,1.08,.94,1)),this.head.add(Fn(He(1,o,2.6,1.7,1.5),0,-1.4,3.6)),this.head.add(Fn(He(.6,"#f4a7b9"),0,-.6,4.9));for(const h of[-1,1]){const f=new qt(new An(1.9,3.6,4),ze(a));f.position.set(h*2.7,4.2,0),f.rotation.z=-h*.25,this.head.add(f);const d=new qt(new Cn(.9,1.4,.5),ze(l));d.position.set(h*1.8,.7,4.3),this.eyes.push(d),this.head.add(d)}this.group.add(this.head),this.tail.position.set(0,2.2,-6);let c=this.tail;for(let h=0;h<3;h++){const f=new he,d=new qt(new ai(.9,1.1,4.2,6).translate(0,2,0),ze(h===2?o:a));d.castShadow=!0,f.add(d),f.position.y=h===0?0:4,f.rotation.x=h===0?-1.2:-.35,c.add(f),c=f}this.group.add(this.tail)}near;group=new he;head=new he;tail=new he;eyes=[];nextBlink=2;blinkT=0;yaw0;looking=!1;update(t,e,n,s){const r=Math.hypot(n.x-this.group.position.x,n.z-this.group.position.z);this.looking=r<this.near;let a=0,o=0;if(this.looking){const l=Math.atan2(n.x-this.group.position.x,n.z-this.group.position.z);a=dn.clamp(Math.atan2(Math.sin(l-this.yaw0),Math.cos(l-this.yaw0)),-1.1,1.1),o=-.32}if(s){this.head.rotation.set(o,a,0);for(const l of this.eyes)l.scale.y=1;this.tail.rotation.y=0;return}this.head.rotation.y=ul(this.head.rotation.y,a,4,t),this.head.rotation.x=ul(this.head.rotation.x,o+Math.sin(e*.7)*.04,4,t),this.tail.rotation.y=Math.sin(e*(this.looking?1.8:1.1))*.45,this.nextBlink-=t,this.nextBlink<=0&&(this.blinkT=.14,this.nextBlink=2.5+e*7.3%3),this.blinkT>0&&(this.blinkT-=t);for(const l of this.eyes)l.scale.y=this.blinkT>0?.12:1}}class Fx{constructor(t,e,n,s,r){this.near=r;const a="#d79a5c",o="#fbecd6",l="#8b5a2b",c="#2f2622";this.yaw0=s,this.group.position.set(t,e,n),this.group.rotation.y=s,this.torso.add(He(1,a,4.6,4,8.4)),this.torso.add(Fn(He(1,o,3,2.6,3),0,-.6,5.2)),this.group.add(this.torso);for(const[f,d]of[[-2.6,4.6],[2.6,4.6],[-2.6,-4.6],[2.6,-4.6]]){const u=new qt(new ai(1.2,1.1,6,6).translate(0,3,0),ze(d>0?o:a));u.position.set(f,0,d),u.castShadow=!0,this.legs.push(u),this.group.add(u)}this.head.add(He(3.8,a)),this.head.add(Fn(He(1,o,2,1.6,2.4),0,-1,3.2)),this.head.add(Fn(He(.8,c),0,-.4,5.4));for(const f of[-1,1]){const d=new qt(new Cn(1.4,4.4,2.6).translate(0,-2,0),ze(l));d.position.set(f*3.4,2.2,-.4),d.rotation.z=f*.35,this.head.add(d);const u=new qt(new Cn(.9,1,.5),ze(c));u.position.set(f*1.6,.9,3.2),this.head.add(u)}this.group.add(this.head);const h=new qt(new ai(.7,1,5.5,6).translate(0,2.7,0),ze(a));h.castShadow=!0,this.tail.add(h),this.group.add(this.tail),this.pose(0,0,0)}near;group=new he;torso=new he;head=new he;tail=new he;legs=[];s=0;yaw0;standing=!1;pose(t,e,n){this.torso.position.set(0,3.6+t*4.6,0),this.torso.rotation.x=-.06*t;for(const s of this.legs)s.scale.y=.18+.82*t,s.position.y=0;this.head.position.set(0,4.4+t*7.6,8.2+t*1.4),this.head.rotation.set(.28-t*.45,n,0),this.tail.position.set(0,4.2+t*4.6,-7.6),this.tail.rotation.set(-1.45+t*.85,e,0)}update(t,e,n,s){const r=Math.hypot(n.x-this.group.position.x,n.z-this.group.position.z);this.standing=r<this.near;let a=0;if(this.standing){const c=Math.atan2(n.x-this.group.position.x,n.z-this.group.position.z);a=dn.clamp(Math.atan2(Math.sin(c-this.yaw0),Math.cos(c-this.yaw0)),-.9,.9)}if(s){this.s=this.standing?1:0,this.pose(this.s,0,a);return}this.s=ul(this.s,this.standing?1:0,5,t);const o=this.standing?Math.sin(e*15)*.7*this.s:Math.sin(e*1.3)*.15,l=(1-this.s)*Math.sin(e*2.2)*.25;this.pose(this.s,o,a*this.s),this.torso.position.y+=l}}const Ox=`
  attribute vec2 aNormal;
  attribute float aPhase;
  attribute float aU;
  attribute float aSide;
  uniform float uTime;
  varying float vAlpha;
  varying float vSide;
  void main() {
    float p = fract(uTime * 0.11 + aPhase);
    float dist = mix(46.0, 3.0, p);            // 從外海慢慢推向岸邊
    vec3 pos = position + vec3(aNormal.x, 0.0, aNormal.y) * (dist + aSide * mix(14.0, 6.0, p));
    vAlpha = smoothstep(0.0, 0.3, p) * (1.0 - smoothstep(0.72, 1.0, p)) * sin(3.14159 * aU);
    vSide = aSide;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }`,Bx=`
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vSide;
  void main() {
    float edge = 1.0 - abs(vSide - 0.5) * 2.0;
    gl_FragColor = vec4(uColor, min(1.0, uOpacity * vAlpha * (0.6 + 0.6 * edge)));
  }`;function zx(){const i=pn.R*1.07,t=rn.map(d=>[d.x,d.y]),e=[],n=[],s=[],r=[],a=[],o=[];let l=0;for(const d of rn)for(let u=0;u<6;u++){const p=(u+.5)*Math.PI/3,y=Math.cos(p),m=Math.sin(p),g=d.x+y*pn.R*Math.sqrt(3),v=d.y+m*pn.R*Math.sqrt(3);if(t.some(([_,b])=>Math.hypot(_-g,b-v)<20))continue;l++;const E=u*Math.PI/3,S=(u+1)*Math.PI/3,R=[d.x+Math.cos(E)*i,d.y+Math.sin(E)*i],T=[d.x+Math.cos(S)*i,d.y+Math.sin(S)*i];for(const _ of[((d.x*.013+u*.37)%1+1)%1,((d.x*.013+u*.37+.5)%1+1)%1]){const O=e.length/3;for(let C=0;C<=6;C++){const L=C/6,z=-.08+L*1.16,$=R[0]+(T[0]-R[0])*z,I=R[1]+(T[1]-R[1])*z;for(const W of[0,1])e.push($,Bn+2.4,I),n.push(y,m),s.push(_),r.push(L),a.push(W)}for(let C=0;C<6;C++){const L=O+C*2,z=L+1,$=L+2,I=L+3;o.push(L,$,z,z,$,I)}}}const c=new Ae;c.setAttribute("position",new Yt(e,3)),c.setAttribute("aNormal",new Yt(n,2)),c.setAttribute("aPhase",new Yt(s,1)),c.setAttribute("aU",new Yt(r,1)),c.setAttribute("aSide",new Yt(a,1)),c.setIndex(o);const h=new Ai({vertexShader:Ox,fragmentShader:Bx,uniforms:{uTime:{value:3.3},uColor:{value:new Kt("#ffffff")},uOpacity:{value:.85}},transparent:!0,depthWrite:!1,side:nn}),f=new qt(c,h);return f.frustumCulled=!1,f.renderOrder=2,{mesh:f,mat:h,edges:l}}function kx(){const i=new An(1.7,7,5).rotateX(Math.PI/2),t=new Ti;t.moveTo(0,0),t.lineTo(-2.4,-3.2),t.lineTo(2.4,-3.2),t.lineTo(0,0);const e=new rr(t).rotateX(-Math.PI/2).translate(0,0,-3.2);i.deleteAttribute("uv"),e.deleteAttribute("uv");const n=new Ae,s=i.toNonIndexed(),r=e.toNonIndexed(),a=new Float32Array([...s.attributes.position.array,...r.attributes.position.array]);return n.setAttribute("position",new gn(a,3)),n.scale(1,.35,1),n}function Gx(){const i=new he,t=He(1,"#5f8b4c",9,3.6,11);t.position.y=1.6;const e=He(1,"#c9b07a",9.6,1.4,11.6);e.position.y=.4;const n=He(2.6,"#a9c983",1,.8,1.3);n.position.set(0,1.2,12.6),n.name="head",i.add(t,e,n);const s=[];for(const[r,a,o]of[[-8,5,7],[8,5,7],[-6.5,-7,4.5],[6.5,-7,4.5]]){const l=He(1,"#a9c983",o,.6,2.2);l.position.set(r,.4,a),l.rotation.y=r<0?.5:-.5,s.push(l),i.add(l)}return i.userData.flippers=s,i}class Hx{group=new he;cat;dog;foam;fish;fishMat;turtle;turtleShadow;ripple;dummy=new Ie;time=3.3;turtleUp=0;constructor(){const t=s=>{const r=mn(s.tile);return[r.x+s.dx,_n(r)+3.2,r.y+s.dz]},e=jn.cat,n=jn.dog;this.cat=new Ux(...t(e),e.yaw,e.near),this.cat.group.scale.setScalar(e.scale),this.dog=new Fx(...t(n),n.yaw,n.near),this.dog.group.scale.setScalar(n.scale),this.foam=zx(),this.fishMat=new Si({color:Bs.day.color,transparent:!0,opacity:Bs.day.opacity,depthWrite:!1,side:nn}),this.fish=new Ef(kx(),this.fishMat,jn.fish.count),this.fish.frustumCulled=!1,this.fish.renderOrder=3,this.turtle=Gx(),this.turtleShadow=new qt(new _a(1,10).scale(10,12,1).rotateX(-Math.PI/2),new Si({color:"#1f5f73",transparent:!0,opacity:.35,depthWrite:!1})),this.turtleShadow.renderOrder=3,this.ripple=new qt(new xa(.85,1,32).rotateX(-Math.PI/2),new Si({color:"#ffffff",transparent:!0,opacity:0,depthWrite:!1})),this.ripple.renderOrder=3,this.group.add(this.cat.group,this.dog.group,this.foam.mesh,this.fish,this.turtle,this.turtleShadow,this.ripple),this.step(0,!0)}get coastEdges(){return this.foam.edges}setTimeOfDay(t){this.foam.mat.uniforms.uColor.value.set(Mh[t].color),this.foam.mat.uniforms.uOpacity.value=Mh[t].opacity,this.fishMat.color.set(Bs[t].color),this.fishMat.opacity=Bs[t].opacity,this.turtleShadow.material.color.set(Bs[t].color)}update(t,e,n){n||(this.time+=t),this.cat.update(t,this.time,e,n),this.dog.update(t,this.time,e,n),n||this.step(this.time,!1)}step(t,e){this.foam.mat.uniforms.uTime.value=t;const n=jn.fish;for(let u=0;u<n.count;u++){const p=t*.22+u/n.count*Math.PI*2*.35,y=Math.sin(t*1.7+u*1.3)*3,m=n.x+Math.cos(p)*(n.rx+u%3*4)+y*.4,g=n.y+Math.sin(p)*(n.ry+u%2*3)+u%3*2;this.dummy.position.set(m,Bn+1.9,g),this.dummy.rotation.set(0,Math.atan2(-Math.sin(p)*n.rx,Math.cos(p)*n.ry)+Math.sin(t*6+u)*.12,0),this.dummy.scale.setScalar(1.25+u%3*.15),this.dummy.updateMatrix(),this.fish.setMatrixAt(u,this.dummy.matrix)}this.fish.instanceMatrix.needsUpdate=!0;const s=jn.turtle,r=t*.05,a=s.x+Math.cos(r)*s.rx,o=s.y+Math.sin(r)*s.ry,l=t%18/18,c=e||l<.55?0:l<.66?(l-.55)/.11:l<.85?1:1-(l-.85)/.15;this.turtleUp=c,this.turtle.position.set(a,Bn-12+c*12.5+Math.sin(t*1.4)*.4*c,o),this.turtle.rotation.set(0,Math.atan2(-Math.sin(r)*s.rx,Math.cos(r)*s.ry),Math.sin(t*.9)*.06);const h=this.turtle.getObjectByName("head");h.position.y=1.2+c*1.4,this.turtle.userData.flippers.forEach((u,p)=>u.rotation.z=Math.sin(t*2+p%2*Math.PI)*.35),this.turtle.visible=c>.02,this.turtleShadow.position.set(a,Bn+1.8,o),this.turtleShadow.rotation.y=this.turtle.rotation.y,this.turtleShadow.material.opacity=.35*(1-c);const f=this.ripple.material,d=l>=.6&&l<.95?(l-.6)/.35:-1;this.ripple.position.set(a,Bn+2.2,o),this.ripple.scale.setScalar(d<0?1:10+d*26),f.opacity=d<0?0:.6*(1-d)}state(){return{catLooking:this.cat.looking,dogStanding:this.dog.standing,fish:jn.fish.count,coastEdges:this.foam.edges,time:Math.round(this.time*10)/10,turtleUp:Math.round(this.turtleUp*100)/100}}}const zs=dn.degToRad(52),oo=30,Vx={hospital:{top:"#b4e2c4",cliff:"#8fbfaa",beach:"#eef4f1"},plaza:{top:"#d7ecaa",cliff:"#c7b08a",beach:"#f6ecd0"},home:{top:"#bde58f",cliff:"#d6a676",beach:"#f6e6bb"}},bn={morning:{bg:"#ffd9b8",hemiSky:"#fff0dc",hemiGround:"#f0c9a8",hemi:2,amb:.45,sun:"#ffd0a0",sunI:2.1,sunPos:[-700,520,420],ocean:"#8fd0d8",glow:.1},day:{bg:"#bfe8f2",hemiSky:"#fffaf0",hemiGround:"#9fd3df",hemi:1.9,amb:.35,sun:"#fff4e0",sunI:2.2,sunPos:[-260,900,520],ocean:"#6fcbe3",glow:0},night:{bg:"#1c2b4a",hemiSky:"#7d93d8",hemiGround:"#2a4566",hemi:1.05,amb:.22,sun:"#9fb4ff",sunI:.55,sunPos:[500,800,-400],ocean:"#30608e",glow:1}};function lo(i,t){const e=i*Math.PI/3;return[t*Math.cos(e),t*Math.sin(e)]}function Wx(i,t){let e=t;const n=()=>(e=(e*9301+49297)%233280)/233280,s=[];for(let h=0;h<12;h++)if(h%2===0)s.push(lo(h/2,i));else{const[f,d]=lo((h-1)/2,i),[u,p]=lo((h+1)/2,i);s.push([(f+u)/2,(d+p)/2])}const r=s.map(([h,f])=>[h*.55,1.5+n()*2.5,f*.55]),a=[0,3,0],o=[],l=(h,f,d)=>o.push(...h,...f,...d);for(let h=0;h<12;h++){const f=(h+1)%12,d=[s[h][0],0,s[h][1]],u=[s[f][0],0,s[f][1]];l(a,r[f],r[h]),l(r[h],r[f],u),l(r[h],u,d)}const c=new Ae;return c.setAttribute("position",new Yt(o,3)),c.computeVertexNormals(),c}function co(i,t,e){const n=new ai(i,t,e,6,1,!1,Math.PI/2);return n.translate(0,-e/2,0),n}const ho=i=>{for(let t=i;t;t=t.parent)if(t.userData.keep||t.userData.item)return!0;return!1};function Vr(i,t,e){i.updateMatrixWorld(!0);const n=i.matrixWorld.clone().invert(),s=[],r=[];if(i.traverse(o=>{const l=o;if(!l.isMesh||!t(l))return;const c=l.material;if(Array.isArray(c)||!c.isMeshStandardMaterial||c.map||c.transparent||c.side===nn)return;let h=l.geometry.clone().applyMatrix4(n.clone().multiply(l.matrixWorld));h.index&&(h=h.toNonIndexed());for(const u of Object.keys(h.attributes))u!=="position"&&u!=="normal"&&h.deleteAttribute(u);h.attributes.normal||h.computeVertexNormals();const f=h.attributes.position.count,d=new Float32Array(f*3);for(let u=0;u<f;u++)d[u*3]=c.color.r,d[u*3+1]=c.color.g,d[u*3+2]=c.color.b;h.setAttribute("color",new gn(d,3)),s.push(h),r.push(l)}),!s.length)return null;for(const o of r)o.parent?.remove(o);const a=new qt(mx(s),e??new Vn({vertexColors:!0,flatShading:!0,roughness:.85}));return a.castShadow=a.receiveShadow=!0,i.add(a),a}class Xx{constructor(t,e){this.container=t,this.opts=e,this.reducedMotion=e.reducedMotion,this.renderer=new px({antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Vs,this.renderer.outputColorSpace=Ve,t.append(this.renderer.domElement),this.renderer.domElement.setAttribute("aria-hidden","true"),new ResizeObserver(()=>this.resize()).observe(t),this.resize();for(const n of Oi)this.adj.has(n.a)||this.adj.set(n.a,[]),this.adj.has(n.b)||this.adj.set(n.b,[]),this.adj.get(n.a).push(n.b),this.adj.get(n.b).push(n.a);this.init().catch(n=>e.hooks.onError?.(n))}container;opts;renderer;scene=new pf;camera=new En(oo,1,10,9e3);target=new D(504,0,380);dist=2400;az=0;anim=null;nav;avatar;following=!1;ocean;oceanBase;oceanAmp;wildlife;tileGroups=new Map;linkGroup=new he;boatObj;lamp;heart;windmill;glowMats=[];walkers=[];hemi;amb;sun;mascot;raycaster=new yp;last=performance.now();elapsed=0;width=1;height=1;ready=!1;adj=new Map;timeOfDay="day";introUntil=0;reducedMotion=!1;async init(){const t="/heart-island/",[e,n,s,r]=await Promise.all(["avatar-patient","avatar-caregiver","avatar-staff","mascot"].map(l=>_x(`${t}assets/${l}.svg`))),a=this.scene;a.background=new Kt(bn.day.bg),a.fog=new Pl(bn.day.bg,2800,6500),this.hemi=new pp(bn.day.hemiSky,bn.day.hemiGround,bn.day.hemi),this.amb=new xp("#ffffff",bn.day.amb),this.sun=new _p(bn.day.sun,bn.day.sunI),this.sun.target.position.set(504,0,380),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048);const o=this.sun.shadow.camera;o.left=-800,o.right=800,o.top=800,o.bottom=-800,o.near=100,o.far=2600,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=1.5,a.add(this.hemi,this.amb,this.sun,this.sun.target),this.buildOcean();for(const l of rn)this.buildTile(l);this.buildPaths(),a.add(this.linkGroup),this.linkGroup.visible=!1,this.nav=new Nx({nodes:xe,edges:Oi},yh,200,l=>this.opts.hooks.onNavEvent(l)),this.avatar=new xx({patient:e,caregiver:n,staff:s},this.opts.role),a.add(this.avatar.group),this.syncAvatar(0),this.boatObj=Ix(),a.add(this.boatObj),this.wildlife=new Hx,a.add(this.wildlife.group),this.buildMascot(r),this.buildWalkers(),new URLSearchParams(location.search).has("debug")&&this.buildDebug(),this.setTimeOfDay("day"),this.panorama(!1),this.ready=!0,this.renderer.setAnimationLoop(()=>this.frame()),this.opts.hooks.onReady()}buildOcean(){const t=new Ri(5200,5200,70,70);t.rotateX(-Math.PI/2),this.oceanBase=Float32Array.from(t.attributes.position.array),this.oceanAmp=new Float32Array(this.oceanBase.length/3);for(let e=0;e<this.oceanAmp.length;e++){const n=this.oceanBase[e*3]+504,s=this.oceanBase[e*3+2]+380,r=Math.min(...rn.map(a=>Math.hypot(a.x-n,a.y-s)));this.oceanAmp[e]=dn.clamp((r-110)/520,.12,1)}this.ocean=new qt(t,ze(bn.day.ocean,{roughness:.5,metalness:.02})),this.ocean.position.set(504,Bn,380),this.ocean.receiveShadow=!0,this.scene.add(this.ocean)}buildTile(t){const e=_n(t),n=Vx[t.look],s=new he;s.position.set(t.x,e,t.y),s.userData.station=t.id.startsWith("decor")?void 0:t.id;const r=pn.R,a=e-Bn+6;for(const[u,p,y]of[[r*1.3,"#8fd3e2",.5],[r*1.12,"#bfe9f1",.65]]){const m=new qt(co(u,u,1),new Vn({color:p,transparent:!0,opacity:y,depthWrite:!1,flatShading:!0}));m.position.y=Bn-e+1.4,m.receiveShadow=!0,s.add(m)}const o=new qt(co(r,r*.9,a),ze(n.cliff)),l=new qt(co(r*1.03,r*1.08,8),ze(n.beach));l.position.y=Bn-e+6;const c=new qt(Wx(r,Math.round(t.x*7+t.y+11)),ze(n.top));s.add(o,l,c);const h=Rx[t.id]?.();if(h){s.add(h);const u=h.getObjectByName("lamp");u&&(this.lamp=u);const p=h.getObjectByName("heart");p&&(this.heart=p);const y=h.getObjectByName("windmill");y&&(this.windmill=y)}(this.opts.stationItems[t.id]??[]).slice(0,cl.length).forEach((u,p)=>{const[y,m]=cl[p],g=Px(p);g.position.set(y,0,m),g.userData.item=u.id,s.add(g),Vr(g,()=>!0);const v=Lx(p+1);v.position.set(0,32,0),g.add(v)});const d=new Vn({vertexColors:!0,flatShading:!0,roughness:.6,emissive:"#ffd27a",emissiveIntensity:0});Vr(s,u=>!!u.userData.glow&&!ho(u.parent)&&!ho(u),d)&&this.glowMats.push(d),Vr(s,u=>!u.userData.glow&&u.name!=="lamp"&&!ho(u)),s.traverse(u=>{const p=u.material;u.isMesh&&(u.castShadow=u.castShadow||!p?.transparent,u.receiveShadow=!0),p&&"color"in p&&p.color&&(u.userData.base=p.color.clone())}),this.tileGroups.set(t.id,s),this.scene.add(s)}nodeH(t){return Gl[t]??0}buildPaths(){const t=new he;this.scene.add(t);const e=ze("#f3e6c4"),n=ze("#e7dcc3");for(const s of Oi){const r=xe[s.a],a=xe[s.b],o=this.nodeH(s.a),l=this.nodeH(s.b),c=a.x-r.x,h=a.y-r.y,f=l-o,d=Math.hypot(c,h),u=Math.hypot(d,f),p=new qt(new Cn(s.kind==="link"?13:11,1.4,u+6),s.kind==="link"?n:e);p.position.set((r.x+a.x)/2,(o+l)/2+3.2,(r.y+a.y)/2),p.rotation.set(-Math.atan2(f,d),Math.atan2(c,h),0,"YXZ"),p.receiveShadow=!0,t.add(p)}for(const[s,r]of Object.entries(xe)){if(s.startsWith("gate:"))continue;const a=new qt(new ai(8,8,1.4,8),e);a.position.set(r.x,this.nodeH(s)+3.4,r.y),t.add(a)}Vr(t,()=>!0)}buildMascot(t){const e=rn.filter(a=>!a.id.startsWith("decor")).sort((a,o)=>bh(a.id)-bh(o.id)).map(a=>a.id),n={nodes:xe,edges:Oi},s=[e[0]];for(let a=1;a<e.length;a++)s.push(...hl(n,e[a-1],e[a]).slice(1));s.push(...hl(n,e[e.length-1],e[0]).slice(1));const r=new Pu(t,2,1,26,29);r.frame(0,0),this.scene.add(r.sprite),this.mascot={s:r,route:s,i:0,t:0,pause:1.2,stops:new Set(e)},this.placeMascot()}placeMascot(){const t=this.mascot,e=t.route[t.i%t.route.length],n=t.route[(t.i+1)%t.route.length],s=xe[e],r=xe[n],a=t.pause>0?0:t.t;t.s.sprite.position.set(s.x+(r.x-s.x)*a+20,this.nodeH(e)+(this.nodeH(n)-this.nodeH(e))*a+3.5,s.y+(r.y-s.y)*a)}buildWalkers(){const t=["#f2a07c","#6ca3d6","#82c29e","#a184c8","#ffd166","#f4a7b9","#7cc3d6","#c98b5a","#9aa5ad","#ef8354"],e=Object.keys(xe).filter(n=>!n.startsWith("gate:"));t.forEach((n,s)=>{const r=e[s*37%e.length],a=wx(n);this.scene.add(a);const o={obj:a,from:r,to:this.adj.get(r)[0],t:s*.13%1,seed:s*7+3};this.walkers.push(o),this.placeWalker(o)})}placeWalker(t){const e=xe[t.from],n=xe[t.to],s=e.x+(n.x-e.x)*t.t,r=e.y+(n.y-e.y)*t.t;t.obj.position.set(s+6,this.nodeH(t.from)+(this.nodeH(t.to)-this.nodeH(t.from))*t.t+3.5,r+4),t.obj.rotation.y=Math.atan2(n.x-e.x,n.y-e.y)}buildDebug(){const t=[];for(const n of Oi){const s=xe[n.a],r=xe[n.b];t.push(s.x,this.nodeH(n.a)+8,s.y,r.x,this.nodeH(n.b)+8,r.y)}const e=new Ae;e.setAttribute("position",new Yt(t,3)),this.scene.add(new Af(e,new su({color:16711935,depthTest:!1})))}frame(){const t=performance.now(),e=Math.min((t-this.last)/1e3,.1);this.last=t,this.elapsed+=e;const n=this.elapsed;if(this.nav.update(e*1e3),this.syncAvatar(n*1e3),this.following)if(!this.nav.moving)this.following=!1;else{const s=this.avatar.group.position;this.target.x+=(s.x-this.target.x)*.06,this.target.z+=(s.z-this.target.z)*.06}if(this.introUntil&&t>this.introUntil){const s=this.az;this.moveTo(this.center(),this.panoramaDist(s),!0,s,1800)}if(this.anim){const s=Math.min(1,(t-this.anim.t0)/this.anim.dur),r=s<.5?2*s*s:1-Math.pow(-2*s+2,2)/2;this.target.lerpVectors(this.anim.fromT,this.anim.toT,r),this.dist=this.anim.fromD+(this.anim.toD-this.anim.fromD)*r,this.az=this.anim.fromA+(this.anim.toA-this.anim.fromA)*r,s>=1&&(this.anim=null)}this.reducedMotion||this.animateDecor(n,e),this.wildlife.update(e,this.avatar.group.position,this.reducedMotion),this.updateCamera(),this.renderer.render(this.scene,this.camera),this.opts.hooks.onCameraChange()}animateDecor(t,e){const n=this.ocean.geometry.attributes.position,s=n.array;for(let a=0;a<s.length;a+=3){const o=this.oceanBase[a],l=this.oceanBase[a+2];s[a+1]=(Math.sin(o*.009+t*.7)*2.4+Math.cos(l*.012+t*.55)*1.8+Math.sin((o+l)*.02+t*1.3)*.6)*this.oceanAmp[a/3]}if(n.needsUpdate=!0,this.ocean.geometry.computeVertexNormals(),this.boatObj){const a=so.length,o=t*.03%a,l=Math.floor(o),c=o-l,h=so[l],f=so[(l+1)%a];this.boatObj.position.set(h[0]+(f[0]-h[0])*c,Bn+Math.sin(t*2)*1.2,h[1]+(f[1]-h[1])*c),this.boatObj.rotation.y=Math.atan2(f[0]-h[0],f[1]-h[1])-Math.PI/2}this.lamp&&(this.lamp.material.emissiveIntensity=.6+Math.sin(t*3)*.5+bn[this.timeOfDay].glow),this.heart&&(this.heart.rotation.y=Math.sin(t*.8)*.5),this.windmill&&(this.windmill.rotation.z+=e*1.2);for(const a of this.walkers){const o=xe[a.from],l=xe[a.to];if(a.t+=e*26/Math.max(1,Math.hypot(l.x-o.x,l.y-o.y)),a.t>=1){const c=this.adj.get(a.to).filter(h=>h!==a.from);a.seed=(a.seed*9301+49297)%233280,a.from=a.to,a.to=c.length?c[a.seed%c.length]:this.adj.get(a.to)[0],a.t=0}this.placeWalker(a)}const r=this.mascot;if(r){if(r.pause>0)r.pause-=e,r.s.frame(1,0);else{const a=xe[r.route[r.i%r.route.length]],o=xe[r.route[(r.i+1)%r.route.length]];r.t+=e*70/Math.max(1,Math.hypot(o.x-a.x,o.y-a.y)),r.s.frame(Math.floor(t*6)%2,0),r.t>=1&&(r.t=0,r.i++,r.stops.has(r.route[r.i%r.route.length])&&(r.pause=1.4))}this.placeMascot()}}heightAtAvatar(){const t=this.nav.segment;if(!t)return this.nav.node?this.nodeH(this.nav.node):0;const e=xe[t.from],n=xe[t.to],s=Math.max(1,Math.hypot(n.x-e.x,n.y-e.y)),r=Math.hypot(this.nav.pos.x-e.x,this.nav.pos.y-e.y)/s;return this.nodeH(t.from)+(this.nodeH(t.to)-this.nodeH(t.from))*r}screenFacing(){const t=this.nav.segment;if(!t)return this.nav.facing;const e=xe[t.from],n=xe[t.to],s=n.x-e.x,r=n.y-e.y,a=Math.cos(this.az),o=Math.sin(this.az);return Uu(s*a-r*o,s*o+r*a,this.nav.facing)}syncAvatar(t){this.avatar.group.position.set(this.nav.pos.x,this.heightAtAvatar()+3.6,this.nav.pos.y),this.avatar.update(this.nav.moving,this.screenFacing(),this.reducedMotion,t)}updateCamera(){const t=new D(Math.sin(this.az)*Math.cos(zs),Math.sin(zs),Math.cos(this.az)*Math.cos(zs)).multiplyScalar(this.dist);this.camera.position.copy(this.target).add(t),this.camera.lookAt(this.target),this.camera.updateMatrixWorld()}resize(){const t=Math.max(1,this.container.clientWidth),e=Math.max(1,this.container.clientHeight);this.width=t,this.height=e,this.renderer.setSize(t,e,!1),this.renderer.domElement.style.width=`${t}px`,this.renderer.domElement.style.height=`${e}px`,this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.ready&&this.panorama(!1)}setRole(t){this.avatar?.setRole(t)}setReducedMotion(t){this.reducedMotion=t}setTimeOfDay(t){this.timeOfDay=t;const e=bn[t];this.scene.background.set(e.bg),this.scene.fog.color.set(e.bg),this.hemi.color.set(e.hemiSky),this.hemi.groundColor.set(e.hemiGround),this.hemi.intensity=e.hemi,this.amb.intensity=e.amb,this.sun.color.set(e.sun),this.sun.intensity=e.sunI,this.sun.position.set(504+e.sunPos[0],e.sunPos[1],380+e.sunPos[2]),this.ocean.material.color.set(e.ocean);for(const n of this.glowMats)n.emissiveIntensity=e.glow;this.heart&&(this.heart.material.emissiveIntensity=.15+e.glow*.6),this.lamp&&(this.lamp.material.emissiveIntensity=.8+e.glow),this.wildlife?.setTimeOfDay(t)}get wildlifeState(){return this.wildlife?.state()??null}goToStation(t,e){if(this.reducedMotion){this.nav.goTo(t,e,{instant:!0}),this.syncAvatar(0),this.target.set(this.nav.pos.x,0,this.nav.pos.y);return}this.nav.goTo(t,e),this.nav.moving&&(this.following=!0,this.anim=null,this.introUntil=0)}placeAt(t,e){this.stopFollow(),this.nav.teleport(e),this.syncAvatar(0)}resetAvatar(){this.placeAt("admission",yh),this.az=0,this.panorama(!1)}stopFollow(){this.following=!1}get destination(){return this.nav?.destination??null}get isMoving(){return this.nav?.moving??!1}get zoom(){return this.height/(2*this.dist*Math.tan(dn.degToRad(oo/2)))}get angle(){return Math.round(dn.radToDeg(this.az))}clampTarget(t){return t.x=dn.clamp(t.x,Dn.x-100,Dn.x+Dn.w+100),t.z=dn.clamp(t.z,Dn.y-100,Dn.y+Dn.h+100),t}panBy(t,e){this.stopFollow(),this.anim=null,this.introUntil=0;const n=this.zoom,s=Math.cos(this.az),r=Math.sin(this.az),a=t/n,o=e/n/Math.sin(zs);this.target.x-=a*s+o*r,this.target.z-=-a*r+o*s,this.clampTarget(this.target)}panoramaDist(t=this.az){const e=Math.tan(dn.degToRad(oo/2)),n=this.width/this.height,s=Math.cos(t),r=Math.sin(t);let a=1/0,o=-1/0,l=1/0,c=-1/0;for(const d of rn)for(const[u,p]of[[-112,0],[pn.R,0],[0,-112],[0,pn.R]]){const y=d.x+u,m=d.y+p,g=y*s-m*r,v=y*r+m*s;a=Math.min(a,g),o=Math.max(o,g),l=Math.min(l,v),c=Math.max(c,v)}const h=((c-l)*Math.sin(zs)+140)/2/e,f=(o-a)/2/(e*n);return Math.max(h,f)*(t%(Math.PI*2)===0?1.05:1.14)}moveTo(t,e,n,s=this.anim?.toA??this.az,r=500){if(this.introUntil=0,this.clampTarget(t),!n||this.reducedMotion){this.anim=null,this.target.copy(t),this.dist=e,this.az=s;return}this.anim={t0:performance.now(),dur:r,fromT:this.target.clone(),toT:t.clone(),fromD:this.dist,toD:e,fromA:this.az,toA:s}}center(){return new D(Dn.x+Dn.w/2,0,Dn.y+Dn.h/2+20)}introFly(t,e){if(this.reducedMotion){this.panorama(!1);return}this.stopFollow(),this.moveTo(new D(t,0,e+10),Math.max(320,this.panoramaDist()/3.2),!1,0),this.introUntil=performance.now()+2600}get cameraSettled(){return!this.anim&&!this.introUntil}panorama(t=!this.reducedMotion){this.stopFollow();const e=this.anim?.toA??this.az;this.moveTo(this.center(),this.panoramaDist(e),t,e)}zoomBy(t){const e=this.panoramaDist()*1.25,s=dn.clamp((this.anim?.toD??this.dist)/t,260,e);this.moveTo((this.anim?.toT??this.target).clone(),s,!0)}zoomImmediate(t){this.anim=null,this.introUntil=0,this.dist=dn.clamp(this.dist/t,260,this.panoramaDist()*1.25)}rotateBy(t,e=!0){const n=(this.anim?.toA??this.az)+dn.degToRad(t);if(!e){this.anim=null,this.introUntil=0,this.az=n;return}const s=this.anim?.toD??this.dist,r=s>=this.panoramaDist()*.85;this.moveTo(r?this.center():(this.anim?.toT??this.target).clone(),r?this.panoramaDist(n):s,!0,n)}resetRotation(){const t=Math.PI*2,e=(this.az%t+t)%t;this.az=e>Math.PI?e-t:e,this.moveTo(this.target.clone(),this.dist,!0,0)}focusAvatar(){const t=this.avatar.group.position;this.focusPoint(t.x,t.z)}focusStation(t){const e=mn(t);this.focusPoint(e.x,e.y)}focusWorld(t,e){this.focusPoint(t,e)}focusPoint(t,e){this.stopFollow(),this.moveTo(new D(t,0,e+10),Math.min(this.dist,this.panoramaDist()/2.4),!0)}setLinks(t,e){if(this.linkGroup.clear(),this.linkGroup.visible=!!t,!t)return;const n=new Si({color:"#ff6a3d"}),s=new Si({color:"#ffffff",transparent:!0,opacity:.55});for(const r of t){if(e&&r.from.station!==e&&r.to.station!==e)continue;const a=mn(r.from.station),o=mn(r.to.station),l=new D(a.x,_n(a)+60,a.y-10),c=new D(o.x,_n(o)+60,o.y-10),h=l.clone().add(c).multiplyScalar(.5);h.y+=70+l.distanceTo(c)*.2;const f=new Ol(l,h,c);this.linkGroup.add(new qt(new ua(f,48,5,6),n)),this.linkGroup.add(new qt(new ua(f,48,8,6),s));for(const d of[l,c]){const u=new qt(new Bl(10,10,8),n);u.position.copy(d),this.linkGroup.add(u)}}}setHighlight(t){for(const[e,n]of this.tileGroups){const s=!!t&&!t.includes(e);n.traverse(r=>{const a=r.material;r.userData.base&&a?.color&&a.color.copy(r.userData.base).multiplyScalar(s?.42:1)})}}hitAt(t,e){const n=new lt(t/this.width*2-1,-(e/this.height)*2+1);this.raycaster.setFromCamera(n,this.camera);const s=this.raycaster.intersectObjects([...this.tileGroups.values()],!0);for(const r of s){let a=r.object,o;for(;a&&(a.userData.item&&(o=a.userData.item),a.parent!==this.scene);)a=a.parent;const l=a?.userData.station;if(l)return{station:l,item:o};if(a)return null}return null}avatarScreen(){const t=this.avatar.group.position;return this.project(t.x,t.y+10,t.z)}project(t,e,n){const s=new D(t,e,n).project(this.camera);return{x:(s.x+1)/2*this.width,y:(1-s.y)/2*this.height,zoom:this.zoom,behind:s.z>1}}labelScreen(t){const e=bx(mn(t));return this.project(e.x,e.h,e.y)}toScreen(t,e,n=0){return this.project(t,n,e)}}const qx=["admission","ward","team","discharge-prep","discharge","home-care","weight","medication","diet","activity","warning","follow-up","long-term-care","palliative","advanced-hf"];function bh(i){return qx.indexOf(i)}const uo="hf-care-island:v1",Wr=()=>({version:1,role:null,lastStation:null,stations:{},welcomeSeen:!1});function $x(){try{return typeof localStorage>"u"?null:localStorage}catch{return null}}const Yx=i=>i==="patient"||i==="caregiver"||i==="staff";class Jx{constructor(t,e=$x()){this.validIds=t,this.storage=e,this.data=this.load()}validIds;storage;data;saveOk=!0;listeners=new Set;load(){try{const t=this.storage?.getItem(uo);if(!t)return Wr();const e=JSON.parse(t),n=Wr();Yx(e.role)&&(n.role=e.role),n.welcomeSeen=e.welcomeSeen===!0,e.lastStation&&this.validIds.includes(e.lastStation)&&(n.lastStation=e.lastStation);for(const s of this.validIds){const r=e.stations?.[s];r&&typeof r=="object"&&(n.stations[s]={explored:!!r.explored,practiced:Array.isArray(r.practiced)?r.practiced.filter(a=>typeof a=="string").slice(0,20):[]})}return n}catch{return Wr()}}save(){try{if(!this.storage)throw new Error("no storage");this.storage.setItem(uo,JSON.stringify(this.data)),this.saveOk=!0}catch{this.saveOk=!1}for(const t of this.listeners)t(this.get())}onChange(t){return this.listeners.add(t),()=>this.listeners.delete(t)}get(){return structuredClone(this.data)}get role(){return this.data.role}setRole(t){this.data.role=t,this.save()}station(t){return this.data.stations[t]??{explored:!1,practiced:[]}}markExplored(t){const e=this.station(t);this.data.stations[t]={...e,explored:!0},this.data.lastStation=t,this.save()}setPracticed(t,e,n){const s=this.station(t),r=new Set(s.practiced);n?r.add(e):r.delete(e),this.data.stations[t]={explored:!0,practiced:[...r]},this.save()}get welcomeSeen(){return this.data.welcomeSeen}setWelcomeSeen(){this.data.welcomeSeen||(this.data.welcomeSeen=!0,this.save())}reset(){this.data=Wr();try{this.storage?.removeItem(uo),this.saveOk=!0}catch{this.saveOk=!1}for(const t of this.listeners)t(this.get())}}function Fu(i,t){return t.length>0&&t.every(e=>i.practiced.includes(e))?"practiced":i.explored||i.practiced.length>0?"explored":"new"}const dl={new:"尚未探索",explored:"已探索",practiced:"已練習"},fo={station:"discharge",title:"出院前，請選擇您想觀看的影片語言",playerTitle:"出院照護影片",prompt:"選好語言後，影片會出現在這個視窗，請按播放鍵開始觀看。看完或想先練習時，都可以按「繼續回覆示教」。",continueLabel:"繼續回覆示教",languages:[{id:"zh",label:"中文",lang:"zh-Hant",url:"https://youtu.be/CVxv18oN3IE"},{id:"ko",label:"한국어",lang:"ko",url:"https://youtu.be/-uMzUK6rr74"},{id:"vi",label:"Tiếng Việt",lang:"vi",url:"https://youtu.be/egGDlRvgJEQ"},{id:"en",label:"English",lang:"en",url:"https://youtu.be/-LxkYPScxt0"},{id:"id",label:"Bahasa Indonesia",lang:"id",url:"https://youtu.be/vILaVEThvz0"}]};function Zx(i){try{const t=new URL(i);if(t.hostname==="youtu.be")return/^[\w-]{11}$/.test(t.pathname.slice(1))?t.pathname.slice(1):null;if(/(^|\.)youtube\.com$/.test(t.hostname)){const e=t.searchParams.get("v");return e&&/^[\w-]{11}$/.test(e)?e:null}}catch{}return null}const fl="https://www.youtube.com";function Kx(i,t){const e=new URLSearchParams({rel:"0",playsinline:"1",enablejsapi:"1"});return t&&/^https?:\/\//.test(t)&&e.set("origin",t),`${fl}/embed/${i}?${e}`}function Qx(i){return i===101||i===150?`這支影片的擁有者不允許在其他網站播放（錯誤 ${i}）。請按「在 YouTube 開啟」觀看。`:i===153?"播放器沒有收到網站來源資訊，無法在站內播放（錯誤 153）。請按「在 YouTube 開啟」觀看。":i===100?"找不到這支影片，可能已移除或設為私人（錯誤 100）。":i===2||i===5?`播放器無法載入這支影片（錯誤 ${i}）。請按「在 YouTube 開啟」觀看。`:`影片暫時無法在站內播放（錯誤 ${i}）。請按「在 YouTube 開啟」觀看。`}function A(i,t={},...e){const n=document.createElement(i);for(const[s,r]of Object.entries(t))r===void 0||r===!1||(typeof r=="function"?n.addEventListener(s.replace(/^on/,"").toLowerCase(),r):s==="class"?n.className=String(r):s==="text"?n.textContent=String(r):r===!0?n.setAttribute(s,""):n.setAttribute(s,String(r)));for(const s of e)s!=null&&s!==!1&&n.append(s);return n}const jx='a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';let Qr=0;const pl=new Set,tv=i=>pl.add(i),or=()=>Qr>0;function lr(i){const t=document.getElementById("modal-root"),e=`modal-title-${Math.random().toString(36).slice(2,8)}`,n=A("h2",{id:e,class:"modal-title",tabindex:"-1"},i.title),s=A("button",{type:"button",class:"icon-btn modal-close"},A("span",{"aria-hidden":"true"},"✕"),A("span",{class:"sr-only"},"關閉")),r=A("div",{class:"modal-body"}),a=A("div",{class:`modal ${i.className??""}`,role:"dialog","aria-modal":"true","aria-labelledby":e},A("div",{class:"modal-head"},n,s),r),o=A("div",{class:"modal-backdrop"},a);t.append(o);const l=[document.getElementById("app"),document.getElementById("intro"),...Array.from(t.children).filter(u=>u!==o)],c=l.map(u=>u?.inert??!1);l.forEach(u=>u&&(u.inert=!0)),Qr++,pl.forEach(u=>u(!0));const h=u=>{if(u.key==="Escape"){u.preventDefault(),d();return}if(u.key!=="Tab")return;const p=Array.from(a.querySelectorAll(jx)).filter(g=>g.offsetParent!==null);if(!p.length)return;const y=p[0],m=p[p.length-1];u.shiftKey&&document.activeElement===y?(u.preventDefault(),m.focus()):!u.shiftKey&&document.activeElement===m&&(u.preventDefault(),y.focus())};a.addEventListener("keydown",h),o.addEventListener("pointerdown",u=>{u.target===o&&d()});let f=!1;function d(){if(f)return;f=!0,o.remove(),l.forEach((p,y)=>p&&(p.inert=c[y])),Qr--,pl.forEach(p=>p(Qr>0)),i.onClose?.();const u=i.returnFocus?.()??i.opener;u&&document.contains(u)&&u.focus()}return s.addEventListener("click",d),requestAnimationFrame(()=>n.focus()),{el:a,body:r,close:d,setTitle:u=>n.textContent=u}}const Eh=new WeakMap;function ye(i,t){i.textContent="",setTimeout(()=>i.textContent=t,30),i.id==="status"&&(window.clearTimeout(Eh.get(i)),Eh.set(i,window.setTimeout(()=>i.textContent="",7e3)))}const ev=[{key:"timing",label:"評估時點"},{key:"owner",label:"負責角色"},{key:"chartLocation",label:"病歷紀錄位置"},{key:"clause",label:"對應認證條文"},{key:"evidence",label:"佐證位置"},{key:"docVersion",label:"文件版本"}];function nv(i){if(typeof i!="string")return null;try{const t=new URL(i);return t.protocol==="https:"?t.href:null}catch{return null}}function iv(i=!1){return Promise.resolve({kind:"unconfigured"})}function sv(i){return null}const wh="醫護人員專區｜院內帳號登入",rv="院內規範入口尚未開放，請洽心衰照護團隊",av="admission",po=sv(),mo=po&&po.ok?po.url:null;let ov=0;function Ou(i={}){const t=`portal-${++ov}`,e=A("p",{id:`${t}-note`,class:"small muted portal-note"},mo?"將另開視窗前往院方核准的院內入口，由院內平台驗證您的院內帳號與文件讀取權限。":"院內規範與認證文件放在院方的入口平台，需以院內帳號登入。"),n=A("p",{id:`${t}-msg`,class:"portal-msg",role:"status","aria-live":"polite"});let s;return mo?s=A("a",{class:"btn btn-primary portal-btn",href:mo,target:"_blank",rel:"noopener noreferrer","aria-describedby":`${t}-note`,"data-portal":"open"},A("span",{"aria-hidden":"true",class:"portal-ico"},"🔒"),wh,A("span",{class:"sr-only"},"（另開新視窗，需院內帳號）")):s=A("button",{type:"button",class:"btn btn-secondary portal-btn","aria-describedby":`${t}-note`,"data-portal":"not-open",onclick:()=>{n.textContent="",setTimeout(()=>n.textContent=rv,30)}},A("span",{"aria-hidden":"true",class:"portal-ico"},"🔒"),wh),A("section",{class:`portal-card ${i.compact?"compact":""}`,"aria-labelledby":`${t}-h`},A("h4",{id:`${t}-h`},"醫護人員專區"),i.compact?"":A("p",{class:"small"},"病友與家屬不需登入，可以直接開始練習。"),s,e,n)}const lv="待確認";async function cv(i){try{return await navigator.clipboard.writeText(i),!0}catch{const t=document.createElement("textarea");t.value=i,t.setAttribute("readonly",""),t.style.position="fixed",t.style.opacity="0",document.body.append(t),t.select();let e=!1;try{e=document.execCommand("copy")}catch{e=!1}return t.remove(),e}}function hv(i,t){const e=i.staff??{topics:[],query:""},n=A("p",{class:"staff-status"},"讀取中…"),s=A("div",{class:"staff-actions"}),r=A("div",{class:"staff-portal"}),a=A("dl",{class:"staff-fields"}),o=c=>{const h=c.kind==="ok"?c.data.stations[i.id]??{}:{};a.replaceChildren(...ev.flatMap(u=>{const p=h[u.key]?.trim();return[A("dt",{},u.label),A("dd",{class:p?"":"pending"},p||lv)]})),s.replaceChildren();const f=c.kind==="ok"?nv(c.data.notebookUrl):null;f?s.append(A("a",{class:"btn btn-secondary",href:f,target:"_blank",rel:"noopener noreferrer"},"開啟疾病認證筆記本",A("span",{class:"sr-only"},"（另開新視窗）"))):r.replaceChildren(Ou({compact:!0})),s.append(A("button",{type:"button",class:"btn btn-secondary",onclick:async()=>ye(t,await cv(e.query)?"已複製認證查詢文字。":"無法自動複製，請長按下方文字手動複製。")},"複製認證查詢文字"));const d=A("p",{id:`staff-why-${i.id}`,class:"small muted"});switch(c.kind){case"unconfigured":n.textContent="公開網站只展示版型與查詢文字。院內規範請由上方「醫護人員專區｜院內帳號登入」進入。",d.textContent="院內文件、規範全文與筆記本連結只放在院方核准的入口平台，不放在公開網頁。";break;case"unauthorized":n.replaceChildren("請先登入院內醫療人員工作頁，才能看到筆記本連結與查核資料。 ",A("a",{href:c.loginUrl},"前往登入")),d.textContent="登入並通過醫療人員授權後才會顯示。";break;case"unavailable":n.textContent="目前無法連線到院內工作頁，以下僅顯示版型。",d.textContent="連線恢復後重新開啟本卡即可。";break;case"ok":n.textContent="已登入院內工作頁。正式認證內容以院內核定文件為準。",d.textContent=f?"":"院方尚未設定筆記本連結。";break}s.append(d)},l=A("section",{class:"staff-card","aria-labelledby":`staff-h-${i.id}`},A("h3",{id:`staff-h-${i.id}`},"醫護規範卡"),A("p",{class:"small muted"},"提供醫護人員在本站對照疾病認證規範使用。未查核的項目標示「待確認」。"),n,r,A("h4",{},"本站相關查核主題"),A("ul",{class:"staff-topics"},...e.topics.map(c=>A("li",{},c))),A("p",{class:"small muted"},"以上為建議查核方向，須對照院內核定文件確認。"),A("h4",{},"查核欄位"),a,A("h4",{},"認證查詢文字（貼到疾病認證筆記本）"),A("blockquote",{class:"staff-query"},e.query),s);return o({kind:"unconfigured"}),n.textContent="讀取中…",iv().then(o),l}const uv=["看情境","做選擇","看回饋","說一次或做一次"],dv=["讀衛教卡","情境練習","看回饋","完成"],fv="虛構內容・待照護團隊審閱",Wi={patient:"病友",caregiver:"家屬",staff:"醫護人員"};function pv(i){const{station:t,role:e,progress:n}=i,s=new Map(i.stations.map(N=>[N.id,N]));n.markExplored(t.id);const r=lr({title:`${t.no}｜${t.title}`,opener:i.opener,returnFocus:i.returnFocus,onClose:i.onClose,className:`mission-modal zone-${t.zone}`});r.el.dataset.station=t.id;const a=A("p",{class:"sr-only",role:"status","aria-live":"polite"}),o=A("div",{class:"mission-view"});r.body.append(o,a);const l=e==="staff"&&t.staff&&t.zone==="hospital"?"staff":"practice",c=t.card,h=t.id===fo.station,f=i.itemId?{kind:"item",itemId:i.itemId}:{kind:"intro",tab:l};let d=h?{kind:"video"}:i.itemId?{kind:"item",itemId:i.itemId}:c?{kind:"card"}:{kind:"intro",tab:l};const u=N=>{d=N,R()},p=N=>t.missions.findIndex(U=>U.id===N),y=N=>n.station(t.id).practiced.includes(N.id),m=N=>u(c?{kind:"card"}:{kind:"scenario",i:N}),g=()=>t.review==="pending"?A("p",{class:"pill review"},fv):"";function v(N,U,K){return A("div",{class:"stepper"},A("p",{class:"stepper-title"},t.missions.length>1?`任務 ${K+1}／${t.missions.length}：${U.title}`:U.title),A("ol",{class:"steps","aria-label":"任務步驟"},...(c?dv:uv).map((st,k)=>A("li",{class:k===N?"on":k<N?"past":"","aria-current":k===N?"step":void 0},st))))}const E=(N,U="")=>A("h3",{class:`step-heading ${U}`,tabindex:"-1"},N),S=(N="回到本站")=>A("button",{type:"button",class:"btn btn-secondary",onclick:()=>u({kind:"intro",tab:"practice"})},N);function R(){switch(o.replaceChildren(),o.dataset.step=d.kind,d.kind){case"intro":b(d);break;case"card":I();break;case"item":$(d.itemId);break;case"scenario":W(d.i);break;case"choose":Z(d);break;case"feedback":G(d);break;case"teach":rt(d.i);break;case"done":Y();break;case"video":C(d);break}const N=o.querySelector(".step-heading");N&&requestAnimationFrame(()=>N.focus())}function T(N){return ms.filter(U=>U.from.station===t.id&&(!N||U.from.item===N)||U.to.station===t.id&&(!N||U.to.item===N)).map(U=>{const K=U.from.station===t.id?U.to:U.from,st=s.get(K.station),k=st.items.find(et=>et.id===K.item);return{label:U.label,station:st,item:k}})}function _(N){const U=T(N);return U.length?A("section",{class:"care-links","aria-label":"照護串聯"},A("h4",{},"照護串聯"),A("ul",{},...U.map(K=>A("li",{},A("button",{type:"button",class:"link-btn",onclick:()=>{r.close(),i.onGoStation?.(K.station.id,K.item?.id)}},A("span",{class:`zone-dot ${K.station.zone}`,"aria-hidden":"true"}),A("span",{},A("strong",{},`${K.station.no} ${K.station.title}`),K.item?`・${K.item.title}`:""),A("span",{class:"small muted link-label"},K.label)))))):""}function b(N){const U=[{id:"practice",label:e==="staff"?"衛教與練習":"照護與練習"}];if(t.staff&&U.push({id:"staff",label:"醫護規範"}),U.length>1){const st=A("div",{class:"tabs",role:"tablist","aria-label":"本站內容",style:`grid-template-columns: repeat(${U.length}, 1fr)`},...U.map(k=>A("button",{type:"button",role:"tab",id:`tab-${k.id}`,"aria-selected":String(k.id===N.tab),"aria-controls":`panel-${k.id}`,tabindex:k.id===N.tab?"0":"-1",class:"tab",onclick:()=>u({kind:"intro",tab:k.id})},k.label)));st.addEventListener("keydown",k=>{const et=k;if(et.key!=="ArrowRight"&&et.key!=="ArrowLeft")return;const pt=U.findIndex(ht=>ht.id===N.tab),Dt=U[(pt+(et.key==="ArrowRight"?1:U.length-1))%U.length];u({kind:"intro",tab:Dt.id}),requestAnimationFrame(()=>document.getElementById(`tab-${Dt.id}`)?.focus())}),o.append(st)}const K=A("div",{role:U.length>1?"tabpanel":void 0,id:`panel-${N.tab}`,"aria-labelledby":U.length>1?`tab-${N.tab}`:void 0,class:"tabpanel"});if(N.tab==="staff"&&t.staff){K.append(E("醫護規範卡","sr-only-heading"),hv(t,a)),o.append(K);return}K.append(A("p",{class:`zone-chip ${t.zone}`},t.zone==="hospital"?"住院區":"居家區",`・${t.subtitle}`),E(t.subtitle,"sr-only-heading"),A("p",{class:"scene"},t.scene),A("p",{class:"role-tip"},A("strong",{},`${Wi[e]}提示：`),t.roleTips[e]),t.id===av?Ou():"",t.notice?A("p",{class:"notice"},t.notice):"",A("h4",{},"本站照護重點"),A("ul",{class:"item-grid"},...t.items.map((st,k)=>A("li",{},A("button",{type:"button",class:"item-card","data-item":st.id,onclick:()=>u({kind:"item",itemId:st.id})},A("span",{class:"item-no","aria-hidden":"true"},String(k+1)),A("span",{class:"item-title"},st.title),A("span",{class:"item-meta"},st.missionId?y(t.missions[p(st.missionId)])?"已練習":"可練習":"說明")))))),t.pickMission&&K.append(A("p",{class:"pick-prompt"},t.pickMission.prompt)),K.append(A("h4",{},t.pickMission?"展館":"練習任務"),A("ul",{class:"mission-list"},...t.missions.map((st,k)=>A("li",{},A("button",{type:"button",class:"mission-pick",onclick:()=>m(k)},A("span",{class:"mission-pick-title"},t.pickMission?`進入：${st.title}`:`${k+1}. ${st.title}`),A("span",{class:"mission-pick-meta"},mv(st),y(st)?" · 已練習":"")))))),t.pickMission||K.append(A("button",{type:"button",class:"btn btn-primary btn-block",onclick:()=>m(0)},c?"打開衛教卡":"開始任務")),t.id===fo.station&&K.append(A("button",{type:"button",class:"btn btn-secondary btn-block","data-video":"again",onclick:()=>u({kind:"video"})},"▶ 再看一次照護影片")),K.append(_()),o.append(K)}let O=null;function C(N){const U=fo,K=U.languages.find(st=>st.id===N.lang);if(o.append(E(K?U.playerTitle:U.title,"video-title")),K){const st=Zx(K.url);o.append(A("p",{class:"video-current"},"影片語言：",A("strong",{lang:K.lang},K.label)));const k=A("p",{class:"video-status",role:"status","data-video":"status",hidden:!0});if(st){const et=A("iframe",{src:Kx(st,location.origin),title:`出院照護影片（${K.label}）`,allow:"accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",allowfullscreen:!0,referrerpolicy:"strict-origin-when-cross-origin","data-video":"player"});z(et,k),o.append(A("div",{class:"video-frame"},et))}o.append(k),o.append(A("div",{class:"video-actions"},A("button",{type:"button",class:"btn btn-secondary","data-video":"switch",onclick:()=>{O=K.id,u({kind:"video"})}},"切換語言"),A("a",{class:"btn btn-secondary",href:K.url,target:"_blank",rel:"noopener noreferrer","data-video":"youtube"},"在 YouTube 開啟",A("span",{class:"sr-only"},"（另開新分頁）"))),A("p",{class:"small muted"},"請按影片上的播放鍵開始觀看。影片無法播放時，請按「在 YouTube 開啟」。")),ye(a,`已切換為${K.label}影片。`)}else if(o.append(A("p",{class:"video-prompt"},U.prompt),A("div",{class:"lang-grid",role:"group","aria-label":"選擇影片語言"},...U.languages.map(st=>A("button",{type:"button",class:"lang-btn",lang:st.lang,"data-lang":st.id,onclick:()=>u({kind:"video",lang:st.id})},st.label)))),O){const st=O;O=null,requestAnimationFrame(()=>requestAnimationFrame(()=>o.querySelector(`[data-lang="${st}"]`)?.focus()))}o.append(A("div",{class:"actions"},A("button",{type:"button",class:"btn btn-primary btn-block","data-video":"continue",onclick:()=>u(f)},U.continueLabel)))}let L=null;function z(N,U){L?.();let K=!1;const st=ht=>{U.textContent=ht,U.hidden=!1,N.dataset.state="error"},k=ht=>{if(ht.origin!==fl||ht.source!==N.contentWindow)return;let Lt;try{Lt=typeof ht.data=="string"?JSON.parse(ht.data):ht.data}catch{return}!Lt||typeof Lt!="object"||(Lt.event==="onError"?st(Qx(Number(Lt.info))):(Lt.event==="onReady"||Lt.event==="initialDelivery"||Lt.event==="infoDelivery")&&(K||(K=!0,N.dataset.state=N.dataset.state==="error"?"error":"ready")))},et=()=>N.contentWindow?.postMessage(JSON.stringify({event:"listening",id:"hf-discharge-video",channel:"widget"}),fl);N.addEventListener("load",()=>{et(),setTimeout(et,400)});const pt=window.setTimeout(()=>{!K&&N.isConnected&&N.dataset.state!=="error"&&st("播放器沒有回應，可能被網路或瀏覽器阻擋。請按「在 YouTube 開啟」觀看。")},12e3);window.addEventListener("message",k),L=()=>{window.removeEventListener("message",k),clearTimeout(pt)};const Dt=new MutationObserver(()=>{N.isConnected||(L?.(),L=null,Dt.disconnect())});Dt.observe(document.body,{childList:!0,subtree:!0})}function $(N){const U=t.items.find(st=>st.id===N);if(!U){u({kind:"intro",tab:"practice"});return}const K=p(U.missionId);o.append(A("p",{class:`zone-chip ${t.zone}`},`本站照護重點 ${t.items.indexOf(U)+1}／${t.items.length}`),E(U.title),A("p",{class:"item-summary"},U.summary),_(U.id),A("div",{class:"actions"},S("看本站全部重點"),K>=0?A("button",{type:"button",class:"btn btn-primary",onclick:()=>m(K)},"練習這一題"):""))}function I(){if(!c)return;const N=t.missions[0];o.append(A("p",{class:`zone-chip ${t.zone}`},t.zone==="hospital"?"住院區":"居家區",`・${t.subtitle}`),g(),v(0,N,0),A("section",{class:"care-card","aria-labelledby":"care-card-title"},A("h3",{class:"step-heading",id:"care-card-title",tabindex:"-1"},c.title),A("p",{class:"care-card-summary"},c.summary),A("ul",{class:"care-card-points"},...c.points.map(U=>A("li",{},U))),c.note?A("p",{class:"notice"},c.note):""),y(N)?A("p",{class:"pill ok"},"本站已完成，可以再練習一次"):"",A("div",{class:"actions"},A("button",{type:"button",class:"btn btn-secondary",onclick:()=>u({kind:"intro",tab:"practice"})},"看本站重點"),A("button",{type:"button",class:"btn btn-primary",onclick:()=>u({kind:"choose",i:0,tried:[],order:[]})},"開始情境練習")))}function W(N){const U=t.missions[N];o.append(v(0,U,N),E("情境"),A("p",{class:"scenario"},U.scenario)),U.prop&&o.append(Th(U.prop)),o.append(A("div",{class:"actions"},A("button",{type:"button",class:"btn btn-primary",onclick:()=>u({kind:"choose",i:N,tried:[],order:[]})},"下一步：做選擇")))}function Z(N){const U=t.missions[N.i];if(c?o.append(g(),v(1,U,N.i),A("h3",{class:"step-heading",tabindex:"-1"},"情境"),A("p",{class:"scenario"},U.scenario),A("p",{class:"pick-prompt"},U.question)):o.append(v(1,U,N.i),E(U.question)),U.prop&&U.prop.kind==="sheet"&&o.append(Th(U.prop,!0)),U.interaction==="reflection"&&o.append(A("p",{class:"pill"},"照護偏好題・沒有對錯・不計分")),U.interaction==="sequence"){const K=N.order,st=A("ol",{class:"seq-picked","aria-label":"你排的順序"},...K.map(et=>A("li",{},U.choices.find(pt=>pt.id===et).label)));K.length||st.append(A("li",{class:"muted placeholder"},"尚未選擇"));const k=A("div",{class:"choices"},...U.choices.map(et=>A("button",{type:"button",class:"choice",disabled:K.includes(et.id),onclick:()=>u({...N,order:[...K,et.id]})},K.includes(et.id)?`${et.label}（第 ${K.indexOf(et.id)+1} 步）`:et.label)));o.append(A("p",{class:"small muted"},"依序點選步驟："),k,A("h4",{},"你排的順序"),st,A("div",{class:"actions"},A("button",{type:"button",class:"btn btn-secondary",disabled:!K.length,onclick:()=>u({...N,order:[]})},"重新排"),A("button",{type:"button",class:"btn btn-primary",disabled:K.length!==U.choices.length,onclick:()=>u({kind:"feedback",i:N.i,tried:N.tried,order:K,correct:K.join("|")===U.correctOrder.join("|")})},"確認順序")));return}o.append(A("div",{class:"choices",role:"group","aria-label":"選項"},...U.choices.map(K=>{const st=N.tried.includes(K.id);return A("button",{type:"button",class:`choice ${st?"tried":""}`,onclick:()=>{const k=U.interaction==="quiz"?K.id===U.correctChoiceId:null;u({kind:"feedback",i:N.i,tried:k===!1?[...N.tried,K.id]:N.tried,choiceId:K.id,correct:k})}},K.label,st?A("span",{class:"sr-only"},"（已試過）"):null)})))}function G(N){const U=t.missions[N.i];o.append(v(2,U,N.i));const K=A("button",{type:"button",class:"btn btn-primary",onclick:()=>u({kind:"teach",i:N.i})},"下一步：說一次或做一次");if(U.interaction==="reflection"){const et=U.choices.find(pt=>pt.id===N.choiceId);o.append(E("謝謝你的分享"),A("p",{},"你選擇的是：",A("strong",{},et.label)),A("p",{class:"feedback neutral"},et.feedback)),U.conversationCard&&o.append(A("figure",{class:"talk-card"},A("figcaption",{},U.conversationCard),A("p",{class:"talk-card-main"},et.label),A("p",{class:"small"},"我希望一起參與的人：＿＿＿＿＿＿"),A("p",{class:"small"},"我想先問醫師的是：＿＿＿＿＿＿"),A("p",{class:"small muted"},"這張卡只顯示在畫面上，不會被儲存。可以抄在紙上帶去和家人、醫師談。"))),o.append(A("div",{class:"actions"},A("button",{type:"button",class:"btn btn-secondary",onclick:()=>u({kind:"choose",i:N.i,tried:[],order:[]})},"換一個選項"),K)),ye(a,`你選擇了：${et.label}。這題沒有對錯。`);return}const st=!!N.correct;let k="";if(U.interaction==="quiz"?k=U.choices.find(et=>et.id===N.choiceId).feedback:k=st?`順序正確：${U.correctOrder.map(et=>U.choices.find(pt=>pt.id===et).label).join(" → ")}。`:U.retryHint,o.append(E(st?"✓ 答對了":"✗ 再想想",st?"ok":"retry"),U.interaction==="sequence"&&N.order?A("p",{},"你排的順序：",N.order.map(et=>U.choices.find(pt=>pt.id===et).label).join(" → ")):A("p",{},"你選擇的是：",A("strong",{},U.choices.find(et=>et.id===N.choiceId).label)),A("p",{class:`feedback ${st?"ok":"retry"}`},A("strong",{},st?"正確。":c?"原因：":"提示："),k)),c){st?(n.setPracticed(t.id,U.id,!0),o.append(A("p",{class:"pill ok"},"✓ 本站已完成"),A("p",{class:"small muted"},"答對後自動標記為「已完成」，只記錄在這台裝置上，不代表醫療人員已確認示教能力。"),A("div",{class:"actions"},A("button",{type:"button",class:"btn btn-primary btn-lg",onclick:()=>r.close()},"返回地圖"))),ye(a,"答對了，本站已完成。")):(o.append(A("div",{class:"actions"},A("button",{type:"button",class:"btn btn-secondary",onclick:()=>u({kind:"card"})},"再看一次衛教卡"),A("button",{type:"button",class:"btn btn-primary",onclick:()=>u({kind:"choose",i:N.i,tried:N.tried,order:[]})},"再試一次"))),ye(a,"答錯了，請看原因後再試一次。"));return}o.append(A("div",{class:"actions"},st?K:A("button",{type:"button",class:"btn btn-primary",onclick:()=>u({kind:"choose",i:N.i,tried:N.tried,order:[]})},"再試一次"))),ye(a,st?"答對了。":"答錯了，請看提示後再試一次。")}function rt(N){const U=t.missions[N],K=y(U),st=()=>{const et=N===t.missions.length-1||t.pickMission;u(et?{kind:"done"}:{kind:"scenario",i:N+1})},k=et=>A("p",{class:"teach"},U.teachBack[et]);o.append(v(3,U,N),E(e==="caregiver"?"家屬練習：說一次或做一次":e==="staff"?"請病友與家屬說一次或做一次":"說一次或做一次")),e==="staff"?o.append(A("h4",{},"病友版"),k("patient"),A("h4",{},"家屬版"),k("caregiver")):o.append(k(e)),o.append(A("p",{class:"small muted"},"「已練習」由使用者自己勾選，只記錄在這台裝置上，不代表醫療人員已確認示教能力。"),K?A("p",{class:"pill ok"},"這個任務之前已標記為「已練習」"):"",A("div",{class:"actions"},A("button",{type:"button",class:"btn btn-secondary",onclick:()=>{n.setPracticed(t.id,U.id,!1),ye(a,"已標記為稍後再練。"),st()}},"稍後再練"),A("button",{type:"button",class:"btn btn-primary",onclick:()=>{n.setPracticed(t.id,U.id,!0),ye(a,"已標記為已練習。"),st()}},"已練習")))}function Y(){const N=n.station(t.id),U=t.missions.map(pt=>pt.id),K=Fu(N,U),st=U.filter(pt=>N.practiced.includes(pt)).length,k=i.stations.findIndex(pt=>pt.id===t.id),et=i.stations[k+1];o.append(E("本站完成"),A("p",{},`本站狀態：${dl[K]}（已練習 ${st}／${U.length}，使用者自填）`),t.pickMission&&st<U.length?A("button",{type:"button",class:"btn btn-secondary btn-block",onclick:()=>u({kind:"intro",tab:"practice"})},"參觀另一個展館"):"",et?A("button",{type:"button",class:"btn btn-secondary btn-block",onclick:()=>{r.close(),i.onGoStation?.(et.id)}},`下一站：${et.no} ${et.title}`):"",_(),A("div",{class:"actions"},A("button",{type:"button",class:"btn btn-secondary",onclick:()=>{r.close(),i.onOpenList?.()}},"站點清單"),A("button",{type:"button",class:"btn btn-primary",onclick:()=>r.close()},"回到島圖")))}return R(),r}function mv(i){return i.interaction==="quiz"?"知識題":i.interaction==="sequence"?"排序題":"照護偏好・不計分"}function Th(i,t=!1){if(i.kind==="sheet")return A("figure",{class:`prop-sheet ${t?"compact":""}`},A("figcaption",{},A("span",{},i.title),A("span",{class:"badge"},i.badge)),A("table",{},A("tbody",{},...i.rows.map(n=>A("tr",{},A("th",{scope:"row"},n.label),A("td",{},n.value))))));if(i.kind==="stages")return A("ol",{class:"stage-cards"},...i.items.map(n=>A("li",{},A("h4",{},n.title),A("p",{},n.text))));const e=A("figure",{class:"prop-lvad"});return e.innerHTML=`<svg viewBox="0 0 320 170" role="img" aria-labelledby="lvad-t">
    <title id="lvad-t">左心室輔助器示意圖：身體內的幫浦經由導線連到體外的控制器，控制器接兩顆電池。</title>
    <path d="M60 20c14 0 22 10 22 22s-8 22-22 22-22-10-22-22 8-22 22-22zM28 70h64l10 90H18z" fill="#e7eef5" stroke="#8aa4bd" stroke-width="2"/>
    <path d="M62 92c8-6 16 0 12 8-3 6-12 10-12 10s-9-4-12-10c-4-8 4-14 12-8z" fill="#e27c7c"/>
    <circle cx="62" cy="116" r="7" fill="#4f86c6"/>
    <path d="M66 122 C 90 150, 130 150, 160 112" fill="none" stroke="#3b3a36" stroke-width="3"/>
    <rect x="160" y="92" width="56" height="40" rx="8" fill="#fff" stroke="#3d6fa8" stroke-width="3"/>
    <rect x="170" y="102" width="36" height="12" rx="3" fill="#bfe0f5"/>
    <path d="M216 104 h26 M216 120 h26" stroke="#3b3a36" stroke-width="3"/>
    <rect x="242" y="92" width="58" height="20" rx="5" fill="#fff" stroke="#6bbf74" stroke-width="3"/>
    <rect x="242" y="116" width="58" height="20" rx="5" fill="#fff" stroke="#6bbf74" stroke-width="3"/>
    <g font-size="14" font-weight="700" fill="#fff"><circle cx="188" cy="80" r="11" fill="#3d6fa8"/><text x="184" y="85">1</text>
    <circle cx="271" cy="78" r="11" fill="#4c9a57"/><text x="267" y="83">2</text>
    <circle cx="112" cy="156" r="11" fill="#3b3a36"/><text x="108" y="161">3</text></g>
  </svg>`,e.append(A("ol",{class:"lvad-legend"},A("li",{},A("strong",{},"控制器："),"顯示裝置狀態，必要時發出提示聲。"),A("li",{},A("strong",{},"電池："),"提供電力，需要充電與更換。"),A("li",{},A("strong",{},"導線："),"從身體連到控制器，出口處需要照護。")),A("figcaption",{class:"small muted"},"簡化示意圖，不代表任何廠牌。實際操作由團隊用實機教學。")),e}const Xr=i=>i.toLowerCase().replace(/[\s　、，。・（）()「」]/g,"");function gv(i,t){const e=Xr(t);if(!e)return[];const n=[];for(const s of i){const r=[s.title,s.shortName,s.subtitle].some(o=>Xr(o).includes(e)),a=s.items.filter(o=>[o.title,o.summary,...o.keywords].some(l=>Xr(l).includes(e)));for(const o of a)n.push({station:s,item:o,why:o.title});if(!a.length){const o=s.missions.find(l=>Xr(l.title).includes(e));r?n.push({station:s,why:s.subtitle}):o&&n.push({station:s,why:`練習：${o.title}`})}}return n}function Bu(i,t){const e=t.station(i.id),n=i.missions.map(a=>a.id),s=Fu(e,n),r=n.filter(a=>e.practiced.includes(a)).length;return i.card?{st:s,n:r,total:n.length,text:s==="practiced"?"已完成":dl[s]}:{st:s,n:r,total:n.length,text:`${dl[s]}${r?`・已練習 ${r}／${n.length}`:""}`}}function _v(i){const t=lr({title:"清單與搜尋",opener:i.opener,className:"list-modal"}),e=A("input",{type:"search",id:"search-input",class:"search-input",placeholder:"搜尋：例如 體重、喘、藥、低鹽、回診",autocomplete:"off",enterkeyhint:"search"}),n=A("div",{class:"search-results","aria-live":"polite"}),s=A("div",{}),r=l=>{const c=Bu(l,i.progress),h=A("button",{type:"button",class:"station-row","data-station":l.id},A("span",{class:`dot ${c.st} ${l.zone}`,"aria-hidden":"true"},c.st==="practiced"?"✓":l.no),A("span",{class:"station-row-text"},A("span",{class:"station-row-title"},`${l.no} ${l.title}`),A("span",{class:"station-row-sub"},`${l.subtitle}・${c.text}${l.staff?"・含醫護規範":""}`)));h.setAttribute("aria-label",`${l.no} ${l.title}，${l.subtitle}，${c.text}${l.staff?"，含醫護規範":""}。開啟`),h.addEventListener("click",()=>{t.close(),i.onOpen(l.id)});const f=A("button",{type:"button",class:"icon-btn walk-btn",onclick:()=>{t.close(),i.onWalk(l.id)}},A("span",{"aria-hidden":"true"},"🚶"),A("span",{class:"sr-only"},`在地圖上走到${l.title}`));return A("li",{},h,f)},a=(l,c,h)=>A("section",{class:`zone-group ${l}`},A("h3",{},c,A("span",{class:"small muted"},`　${h}`)),A("ul",{class:"station-list"},...i.stations.filter(f=>f.zone===l).map(r)));s.append(A("p",{class:"small muted"},"所有站點都已開放。點站名直接開啟；點 🚶 讓角色在地圖上走過去。"),a("hospital","住院區","入院到出院・醫護人員可查看規範"),a("home","居家區","出院後的居家衛教與照護"),i.progress.saveOk?"":A("p",{class:"notice"},"這台裝置目前無法儲存進度，仍可繼續遊玩，但重新整理後不會保留。"));const o=()=>{const l=e.value.trim();if(s.hidden=!!l,n.replaceChildren(),!l)return;const c=gv(i.stations,l);n.append(A("p",{class:"small muted"},c.length?`找到 ${c.length} 筆`:"找不到符合的內容，換個說法試試看（例如「腳腫」「藥盒」）。")),n.append(A("ul",{class:"station-list"},...c.map(h=>A("li",{},A("button",{type:"button",class:"station-row","data-station":h.station.id,onclick:()=>{t.close(),i.onOpen(h.station.id,h.item?.id)}},A("span",{class:`dot ${h.station.zone}`,"aria-hidden":"true"},h.station.no),A("span",{class:"station-row-text"},A("span",{class:"station-row-title"},h.why),A("span",{class:"station-row-sub"},`${h.station.no} ${h.station.title}`)))))))};return e.addEventListener("input",o),t.body.append(A("label",{class:"sr-only",for:"search-input"},"搜尋照護主題"),e,n,s),i.initialQuery&&(e.value=i.initialQuery,o()),t}function xv(i){const t=lr({title:"照護時間軸",opener:i.opener,className:"timeline-modal"}),e=A("ol",{class:"timeline"});return gl.forEach((n,s)=>{const r=i.stations.filter(a=>a.phases.includes(n.id));e.append(A("li",{class:`phase ${i.active===n.id?"active":""}`,"data-phase":n.id},A("div",{class:"phase-head"},A("span",{class:"phase-no","aria-hidden":"true"},String(s+1)),A("h3",{},n.title),A("button",{type:"button",class:"btn btn-secondary btn-small","aria-pressed":String(i.active===n.id),onclick:()=>{t.close(),i.onHighlight(i.active===n.id?null:n.id)}},i.active===n.id?"取消標示":"在地圖標示")),A("p",{class:"small"},n.description),A("div",{class:"phase-stations"},...r.map(a=>A("button",{type:"button",class:`chip ${a.zone}`,onclick:()=>{t.close(),i.onOpen(a.id)}},`${a.no} ${a.title}`)))))}),t.body.append(A("p",{class:"small muted"},"從入院到回家，每個階段可以先練習的站點。站點在不同階段都可以自由前往。"),e),t}const Xt=i=>document.getElementById(i),Ss=new Map(xn.map(i=>[i.id,i])),jr=[...ed(xn,new Set(Object.keys(xe))),...nd(ms,gl,xn)];for(const i of xn)rn.some(t=>t.id===i.id)||jr.push(`站點 ${i.id} 在 mapData.ts 沒有對應的島`);if(jr.length){const i=Xt("error-banner");throw i.hidden=!1,i.textContent=`衛教內容格式有誤，請修正 src/content/：${jr.join("；")}`,console.error(jr),new Error("content validation failed")}const an=new Jx(_o),ke=Xt("status");let Rn=an.role??"patient";const zu=window.matchMedia("(prefers-reduced-motion: reduce)");let ku=null;const fa=()=>ku??zu.matches,Hl=()=>{document.documentElement.classList.toggle("reduce-motion",fa()),Ft?.setReducedMotion(fa())};zu.addEventListener?.("change",Hl);const Bi=Xt("labels"),Xn=new Map;for(const i of xn){const t=A("button",{type:"button",class:`map-label ${i.zone}`,"data-station":i.id},A("span",{class:"map-label-no","aria-hidden":"true"},i.no),A("span",{class:"map-label-name full"},i.title),A("span",{class:"map-label-name short","aria-hidden":"true"},i.shortName),i.staff?A("span",{class:"map-label-staff","aria-hidden":"true",title:"含醫護規範"},"規"):"",A("span",{class:"map-label-state","aria-hidden":"true"}));t.addEventListener("click",e=>{if(pa){e.preventDefault();return}Ma(i.id)}),t.addEventListener("focus",()=>{t.classList.contains("offscreen")&&Ft?.focusStation(i.id)}),Xn.set(i.id,t),Bi.append(t)}const Gu=Ex.map(i=>{const t=A("div",{class:`zone-sign ${i.zone}`},A("strong",{},i.title),A("span",{},i.sub));return Xt("zone-signs").append(t),{el:t,z:i}});function cr(){for(const t of xn){const e=Xn.get(t.id),n=Bu(t,an);e.dataset.state=n.st,e.querySelector(".map-label-state").textContent=n.st==="practiced"?t.card?"✓ 已完成":"✓":n.st==="explored"?"•":"",e.setAttribute("aria-label",`${t.no} ${t.title}（${t.zone==="hospital"?"住院區":"居家區"}・${t.subtitle}），${n.text}${t.staff?"，含醫護規範":""}。走過去並開啟`)}const i=Xt("role-chip");i.hidden=!an.role,i.textContent=`角色：${Wi[Rn]}`,document.body.dataset.role=Rn}an.onChange(cr);function vv(){if(!Ft)return;const i=[],t=Bi.clientWidth,e=Bi.clientHeight,n=Bi.getBoundingClientRect(),s=document.querySelector(".zoom").getBoundingClientRect(),r=new DOMRect(s.left-n.left-4,s.top-n.top-4,s.width+8,s.height+8),a=Ft.zoom;Bi.classList.toggle("compact",a<.8),Bi.classList.toggle("tiny",a<.42);const o=xn.map(l=>({s:l,p:Ft.labelScreen(l.id)})).sort((l,c)=>l.p.y-c.p.y);for(const{s:l,p:c}of o){const h=Xn.get(l.id),f=c.x<-20||c.x>t+20||c.y<-10||c.y>e+30;if(h.classList.toggle("offscreen",f&&document.activeElement!==h),f&&document.activeElement!==h)continue;const d=h.offsetWidth,u=h.offsetHeight;let p=Math.min(Math.max(c.x-d/2,2),t-d-2),y=Math.min(Math.max(c.y-u/2,2),e-u-2);for(let m=0;m<6;m++){const g=i.find(v=>p<v.right+2&&p+d>v.left-2&&y<v.bottom+2&&y+u>v.top-2);if(!g)break;y=g.bottom+4}p+d>r.left&&y<r.bottom&&y+u>r.top&&(p=Math.max(2,r.left-d)),i.push(new DOMRect(p,y,d,u)),h.style.transform=`translate(${Math.round(p)}px, ${Math.round(y)}px)`}bv(i,t,e,r);for(const{el:l,z:c}of Gu){const h=Ft.toScreen(c.x,c.y,c.h);l.style.transform=`translate(${Math.round(h.x-l.offsetWidth/2)}px, ${Math.round(h.y-l.offsetHeight/2)}px)`}}const Mi=Xt("welcome"),yv=()=>!Mi.hidden;function Sv(){an.welcomeSeen||(Mi.hidden=!1,Xn.get("admission")?.classList.add("beckon"))}function Sa(i=!0){Mi.hidden||(Mi.hidden=!0,Xn.get("admission")?.classList.remove("beckon"),i&&an.setWelcomeSeen())}Xt("welcome-close").addEventListener("click",()=>{Sa(),ye(ke,"已關閉提示。點地圖上的站點，或使用下方「清單」開始。"),Xn.get("admission")?.focus()});Mi.addEventListener("keydown",i=>{i.key==="Escape"&&(Sa(),Xn.get("admission")?.focus())});const Mv=(i,t,e=4)=>i.x<t.right+e&&i.right>t.x-e&&i.y<t.bottom+e&&i.bottom>t.y-e;function bv(i,t,e,n){if(!yv()||!Ft)return;const s=jn.cat,r=mn(s.tile),a=Ft.toScreen(r.x+s.dx,r.y+s.dz,_n(r)+26),o=Mi.offsetWidth,l=Mi.offsetHeight,c=Bi.getBoundingClientRect(),h=[...i,n];for(const{el:p}of Gu){const y=p.getBoundingClientRect();h.push(new DOMRect(y.x-c.x,y.y-c.y,y.width,y.height))}for(const p of["status","phase-chip"]){const y=Xt(p);if(!y.hidden&&y.textContent){const m=y.getBoundingClientRect();h.push(new DOMRect(m.x-c.x,m.y-c.y,m.width,m.height))}}const f=[a.y+34,a.y+80,a.y-l-34,a.y-l-80,12,e-l-12],d=[a.x-o*.3,a.x+24,a.x-o-24];let u=null;t:for(const p of f){if(p<8||p+l>e-8)continue;const m=(p<n.bottom&&p+l>n.top?n.left-8:t-8)-o;if(!(m<8))for(const g of d){const v=Math.min(Math.max(g,8),m),E=new DOMRect(v,p,o,l);if(!h.some(S=>Mv(E,S))){u=[v,p];break t}}}u||(u=[8,Math.max(8,Math.min(e-l-8,f[0]))]),Mi.style.transform=`translate(${Math.round(u[0])}px, ${Math.round(u[1])}px)`}let Ft=null,ml=null,ta=null;function Ev(i){const t=e=>Ss.get(e)?.title??e;if(i.type==="depart"&&ye(ke,`角色正在前往「${t(i.stationId)}」…`),i.type==="retarget"&&ye(ke,`已取消前往「${t(i.from)}」，改為前往「${t(i.to)}」。`),i.type==="arrive"){const e=i.stationId;if(or()){ye(ke,`已抵達「${t(e)}」。點地標即可開啟。`);return}ye(ke,`已抵達「${t(e)}」，開啟本站。`);const n=ta?.station===e?ta.item:void 0;ta=null,Hu(e,Xn.get(e),n)}}const wv=new Xx(Xt("game"),{role:Rn,reducedMotion:fa(),stationItems:Object.fromEntries(xn.map(i=>[i.id,i.items])),hooks:{onNavEvent:Ev,onReady:()=>{Ft=wv,Hl(),cr(),document.body.dataset.ready="true"},onError:i=>{const t=Xt("error-banner");t.hidden=!1,t.textContent=`地圖載入失敗：${i.message}。仍可使用「清單」開啟所有站點。`,document.body.dataset.ready="true"},onCameraChange:vv}});function Ma(i,t){if(!Ft||or())return;const e=Ss.get(i);ml=Xn.get(i),ta=t?{station:i,item:t}:null,Ft.goToStation(i,e.entryNodeId)}function Hu(i,t,e){const n=Ss.get(i);Sa(),ml=t,zi&&Ft?.setLinks(ms,i),pv({station:n,stations:xn,role:Rn,progress:an,itemId:e,opener:t,returnFocus:()=>ml,onClose:()=>{zi&&Ft?.setLinks(ms)},onGoStation:(s,r)=>setTimeout(()=>Ma(s,r),0),onOpenList:()=>setTimeout(Wu,0)})}function Vu(i,t,e){Ft?.placeAt(i,Ss.get(i).entryNodeId),Ft?.focusStation(i),ye(ke,`已開啟「${Ss.get(i).title}」。`),setTimeout(()=>Hu(i,t,e),0)}function Wu(){const i=Xt("station-list-open");_v({stations:xn,progress:an,opener:i,onOpen:(t,e)=>Vu(t,i,e),onWalk:t=>setTimeout(()=>Ma(t),0)})}let Xu=null;function Vl(i){Xu=i;const t=Xt("phase-chip");if(!i){Ft?.setHighlight(null),t.hidden=!0,ye(ke,"已取消階段標示。");return}const e=gl.find(s=>s.id===i),n=xn.filter(s=>s.phases.includes(i)).map(s=>s.id);Ft?.setHighlight(n),t.hidden=!1,t.replaceChildren(A("span",{},`🕒 ${e.title}：${n.length} 站`),A("button",{type:"button",class:"icon-btn",onclick:()=>Vl(null)},A("span",{"aria-hidden":"true"},"✕"),A("span",{class:"sr-only"},"取消階段標示"))),ye(ke,`已標示「${e.title}」的 ${n.length} 個站點：${n.map(s=>Ss.get(s).title).join("、")}。`)}let zi=!1;function Tv(){zi=!zi,Xt("links-btn").setAttribute("aria-pressed",String(zi)),Ft?.setLinks(zi?ms:null),ye(ke,zi?`已顯示 ${ms.length} 條照護串聯線：住院時學的事，連到回家後怎麼做。進入站點可看到串聯說明。`:"已隱藏照護串聯線。")}function Wl(i,t){const e=lr({title:"選擇角色",opener:i,className:"role-modal",onClose:t}),n=(s,r)=>A("button",{type:"button",class:`role-card ${Rn===s&&an.role?"selected":""}`,"data-role":s,onclick:()=>{Rn=s,an.setRole(s),Ft?.setRole(s),cr(),ye(ke,`已選擇角色：${Wi[s]}。`),e.close()}},A("span",{class:`role-avatar ${s}`,"aria-hidden":"true"}),A("span",{class:"role-name"},Wi[s]),A("span",{class:"role-desc"},r));e.body.append(A("p",{},"三個角色走同一座島，提示不同。之後可以從上方的角色按鈕更換。"),A("div",{class:"role-grid"},n("patient","練習說出自己的變化、照顧自己的方法。"),n("caregiver","提示著重陪同、觀察與溝通。"),n("staff","陪同衛教；住院區直接打開醫護規範卡。")))}function Av(){const i=Xt("more-open"),t=lr({title:"更多",opener:i,className:"more-modal"}),e=A("input",{type:"checkbox",id:"rm-toggle"});e.checked=fa(),e.addEventListener("change",()=>{ku=e.checked,Hl(),ye(ke,e.checked?"已開啟減少動態效果：點地標會直接抵達。":"已關閉減少動態效果。")});const n=A("div",{class:"reset-area"}),r=A("button",{type:"button",class:"btn btn-secondary btn-block",id:"reset-open",onclick:()=>{n.replaceChildren(A("p",{class:"notice"},"確定要清除這台裝置上的角色與探索狀態嗎？"),A("div",{class:"actions"},A("button",{type:"button",class:"btn btn-secondary",onclick:()=>n.replaceChildren(r)},"取消"),A("button",{type:"button",class:"btn btn-danger",id:"reset-confirm",onclick:()=>{an.reset(),Rn="patient",Ft?.setRole(Rn),Ft?.resetAvatar(),Vl(null),cr(),t.close(),ye(ke,"已重置，回到初始狀態。"),$u()}},"確定重置"))),n.querySelector("#reset-confirm")?.focus()}},"重置探索狀態");n.append(r),t.body.append(A("button",{type:"button",class:"btn btn-secondary btn-block",onclick:()=>{t.close(),Wl(Xt("more-open"))}},`更換角色（目前：${Wi[Rn]}）`),A("label",{class:"switch",for:"rm-toggle"},e,A("span",{},"減少動態效果（直接抵達地標、停用裝飾動畫）")),A("p",{class:"small muted"},"預設依照系統的「減少動態效果」設定。"),n,A("h3",{},"關於這個原型"),A("ul",{class:"small"},A("li",{},"只在這台裝置儲存角色、站點與「已探索／已練習」狀態，不儲存姓名、病歷、真實體重或照護偏好。"),A("li",{},"「已練習」為使用者自填，不代表醫療人員已確認示教能力。"),A("li",{},"情境中的出院單、照護卡與數字皆為虛構。"),A("li",{},"警訊門檻、聯絡方式與緊急分流以院方核定的個別出院計畫為準；緊急狀況請撥打 119。"),A("li",{},"醫護人員請由 01 站的「醫護人員專區｜院內帳號登入」進入院方入口，由院內平台驗證帳號與文件權限；病友與家屬不需登入。"),A("li",{},"島上那顆紅色小心心會從 01 出發、經過心尖的返家照護站，一路巡到 14，跟著它走就是完整的照護旅程。")),an.saveOk?"":A("p",{class:"notice"},"這台裝置目前無法儲存進度，仍可繼續遊玩。"))}const qu=Xt("intro");function $u(){qu.hidden=!1,Sa(!1),Xt("start-btn").textContent=an.role?"繼續探索":"開始探索",Xt("start-btn").focus()}Xt("start-btn").addEventListener("click",()=>{const i=()=>{qu.hidden=!0,ye(ke,`以「${Wi[Rn]}」角色從醫院大門出發，第一站是「01 入院評估花園」。點島嶼或使用清單前往。`),Sv();const t=jn.cat,e=mn(t.tile);Ft?.introFly((e.x+mn("admission").x)/2,(e.y+t.dz+mn("admission").y)/2),Xn.get("admission")?.focus()};an.role?i():Wl(Xt("start-btn"),()=>{an.role&&i()})});$u();Xt("panorama-btn").addEventListener("click",()=>{Ft?.panorama(),ye(ke,"已回到全景。")});Xt("avatar-btn").addEventListener("click",()=>{Ft?.focusAvatar(),ye(ke,`已移到角色位置（${Wi[Rn]}）。`)});Xt("station-list-open").addEventListener("click",Wu);Xt("timeline-btn").addEventListener("click",()=>xv({stations:xn,opener:Xt("timeline-btn"),active:Xu,onHighlight:i=>{Vl(i),i&&Ft?.panorama()},onOpen:i=>Vu(i,Xt("timeline-btn"))}));Xt("links-btn").addEventListener("click",Tv);Xt("more-open").addEventListener("click",Av);Xt("role-chip").addEventListener("click",()=>Wl(Xt("role-chip")));Xt("zoom-in").addEventListener("click",()=>Ft?.zoomBy(1.25));Xt("rotate-left").addEventListener("click",()=>{Ft?.rotateBy(-45),ye(ke,"視角已向左旋轉。按「全景」可看整座島。")});Xt("rotate-right").addEventListener("click",()=>{Ft?.rotateBy(45),ye(ke,"視角已向右旋轉。按「全景」可看整座島。")});const Ah=[{id:"morning",ico:"🌅",text:"早晨"},{id:"day",ico:"☀️",text:"白天"},{id:"night",ico:"🌙",text:"夜晚"}];let go=1;Xt("tod-btn").addEventListener("click",()=>{go=(go+1)%Ah.length;const i=Ah[go];Ft?.setTimeOfDay(i.id),document.body.dataset.tod=i.id,Xt("tod-ico").textContent=i.ico,Xt("tod-label").textContent=`切換時段，目前：${i.text}`,ye(ke,`現在是${i.text}。`)});Xt("zoom-out").addEventListener("click",()=>Ft?.zoomBy(.8));const ri=Xt("map"),Rv=10;let De=null,pa=!1;const bi=new Map;let ki=null;const Yu=()=>{const[i,t]=[...bi.values()];return{d:Math.hypot(t.x-i.x,t.y-i.y),a:Math.atan2(t.y-i.y,t.x-i.x)}};ri.addEventListener("pointerdown",i=>{if(or()||i.target.closest(".zoom, .phase-chip"))return;if(bi.set(i.pointerId,{x:i.clientX,y:i.clientY}),bi.size===2){ki=Yu(),De&&(De.dragging=!0),ri.setPointerCapture(i.pointerId);return}if(!i.isPrimary)return;const t=i.target;De={id:i.pointerId,x:i.clientX,y:i.clientY,lx:i.clientX,ly:i.clientY,dragging:!1,onCanvas:t instanceof HTMLCanvasElement||t.id==="labels"||!!t.closest(".zone-signs")},pa=!1});ri.addEventListener("pointermove",i=>{if(bi.has(i.pointerId)&&bi.set(i.pointerId,{x:i.clientX,y:i.clientY}),ki&&bi.size===2){const t=Yu();ki.d>0&&Ft?.zoomImmediate(t.d/ki.d),Ft?.rotateBy(-Cv*(t.a-ki.a),!1),ki=t;return}!De||i.pointerId!==De.id||(!De.dragging&&Math.hypot(i.clientX-De.x,i.clientY-De.y)>Rv&&(De.dragging=!0,ri.setPointerCapture(i.pointerId),ri.classList.add("dragging")),De.dragging&&(Ft?.panBy(i.clientX-De.lx,i.clientY-De.ly),De.lx=i.clientX,De.ly=i.clientY))});const Cv=180/Math.PI,Ju=i=>{if(bi.delete(i.pointerId),bi.size<2&&(ki=null),!De||i.pointerId!==De.id)return;const t=De.dragging,e=De.onCanvas;if(De=null,ri.classList.remove("dragging"),t){pa=!0,setTimeout(()=>pa=!1,50);return}if(i.type==="pointerup"&&e&&Ft&&!or()){const n=Xt("game").getBoundingClientRect(),s=Ft.hitAt(i.clientX-n.left,i.clientY-n.top);s&&Ma(s.station,s.item)}};ri.addEventListener("pointerup",Ju);ri.addEventListener("pointercancel",Ju);ri.addEventListener("wheel",i=>{i.preventDefault(),or()||Ft?.zoomBy(i.deltaY<0?1.1:.9)},{passive:!1});tv(i=>document.body.classList.toggle("modal-open",i));cr();window.__hfIsland={get destination(){return Ft?.destination??null},get moving(){return Ft?.isMoving??!1},get zoom(){return Ft?Ft.zoom:null},get angle(){return Ft?Ft.angle:null},get wildlife(){return Ft?Ft.wildlifeState:null},get cameraSettled(){return Ft?Ft.cameraSettled:!1},focusWorld(i,t){Ft?.focusWorld(i,t)},wildlifePoint(i){if(!Ft)return null;const t=jn[i],e=mn(t.tile),n=Xt("game").getBoundingClientRect(),s=Ft.toScreen(e.x+t.dx,e.y+t.dz,_n(e)+8);return{x:n.left+s.x,y:n.top+s.y}},buildingPoint(i){if(!Ft)return null;const t=mn(i),e=Xt("game").getBoundingClientRect(),n=Ft.toScreen(t.x,t.y-20,_n(t)+18);return{x:e.left+n.x,y:e.top+n.y}},itemPoint(i,t){if(!Ft)return null;const e=mn(i),n=Xt("game").getBoundingClientRect(),[s,r]=cl[t],a=Ft.toScreen(e.x+s,e.y+r,_n(e)+8);return{x:n.left+a.x,y:n.top+a.y}},avatarPoint(){if(!Ft)return null;const i=Xt("game").getBoundingClientRect(),t=Ft.avatarScreen();return{x:i.left+t.x,y:i.top+t.y}}};
