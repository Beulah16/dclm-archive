export interface MediaItem {
  id: string;
  title: string;
  date: string; // Formatted date
  year: number;
  language: string;
  city: string;
  state: string;
  country: string;
  minister: string;
  series: string;
  category: string;
  type: 'VIDEO' | 'AUDIO';
  
  // Enhanced metadata
  duration: string;
  views: number;
  thumbnail: string;
  isFavorite: boolean;
  isInPlaylist: boolean;
  description: string;
  tags: string[];
  downloadUrl: string;
  streamUrl: string;
  fileSize: string;
  quality: string;
  transcript?: string;
}

export interface SeriesInfo {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  totalEpisodes: number;
  totalViews: number;
  totalDuration: string;
  startDate: string;
  category: string;
  ministers: string[];
  speakers: string[];
  mediaItems: MediaItem[];
}

export interface CategoryInfo {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  color: string;
  bgColor?: 'orange' | 'teal' | 'blue' | 'purple' | 'gold';
  totalContent: number;
  seriesCount: number;
  totalViews: string;
  totalDuration: string;
  mediaItems: MediaItem[];
}

// Raw data from the user
const rawMediaData = [
  // Videos
  { title: "Q&A - ELISHA'S CALL AND ELIJAH'S", date: "04061995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "SEARCH THE SCRIPTURES", category: "SUNDAY SERVICE", type: "VIDEO" },
  { title: "Q&A - PETER'S DELIVERANCE AND HEROES DEATH", date: "31121995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "SEARCH THE SCRIPTURES", category: "SUNDAY SERVICE", type: "VIDEO" },
  { title: "Q&A - PRAYER OF REPENTANCE AND ABSOLUTE SURRENDER", date: "17121995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "SEARCH THE SCRIPTURES", category: "SUNDAY SERVICE", type: "VIDEO" },
  { title: "THE LORD'S SUPPER - OLD FESTAC", date: "24091994", year: 1994, language: "ENG-YOR", city: "OLD FESTAC", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "THE LORD'S SUPPER", category: "SUNDAY SERVICE", type: "VIDEO" },
  { title: "THE LORD'S SUPPER - KETU", date: "31121994", year: 1994, language: "ENG-YOR", city: "KETU", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "THE LORD'S SUPPER", category: "SUNDAY SERVICE", type: "VIDEO" },
  { title: "ABUNDANT LIFE IN GOD'S PRESENCE", date: "22011995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "WORSHIP SERVICE", category: "SUNDAY SERVICE", type: "VIDEO" },
  { title: "ANSWERING THE CALL TO EVANGELIZE", date: "10121995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "WORSHIP SERVICE", category: "SUNDAY SERVICE", type: "VIDEO" },
  { title: "GIVING AND CARING AMONGST BRETHREN", date: "25061995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "WORSHIP SERVICE", category: "SUNDAY SERVICE", type: "VIDEO" },
  { title: "GOD'S CALL TO THE OVERCOMING LIFE", date: "20011995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "COVENANT SERVICE", category: "SUNDAY SERVICE", type: "VIDEO" },
  { title: "GOD'S PLAN FOR YOUR LIFE", date: "01011995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "COVENANT SERVICE", category: "SUNDAY SERVICE", type: "VIDEO" },
  { title: "ASSURANCE OF SALVATION", date: "01021999", year: 1999, language: "ENG", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "YOUTH BIBLE STUDY", category: "BIBLE STUDY", type: "VIDEO" },
  { title: "VICTORY OVER TEMPTATION", date: "23031999", year: 1999, language: "ENG", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "YOUTH BIBLE STUDY", category: "BIBLE STUDY", type: "VIDEO" },
  { title: "DIVINE FAVOUR FOR THE UPRIGHT", date: "23022004", year: 2004, language: "ENG", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "YOUTH BIBLE STUDY", category: "BIBLE STUDY", type: "VIDEO" },
  { title: "PROFIT OF DIVINE COMPANIONSHIP", date: "03052004", year: 2004, language: "ENG", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "YOUTH BIBLE STUDY", category: "BIBLE STUDY", type: "VIDEO" },
  { title: "THE SECRETS OF SUCCESS", date: "24052004", year: 2004, language: "ENG", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "YOUTH BIBLE STUDY", category: "BIBLE STUDY", type: "VIDEO" },
  { title: "THE FAITHFULNESS OF A CHRIST CENTERED CHURCH", date: "03102016", year: 2016, language: "ENG", city: "FESTAC", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MONDAY BIBLE STUDY", category: "BIBLE STUDY", type: "VIDEO" },
  { title: "THE FUTURE DESTINY OF SANCTIFIED CONQUERORS", date: "28112016", year: 2016, language: "ENG", city: "NULL", state: "NULL", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MONDAY BIBLE STUDY", category: "BIBLE STUDY", type: "VIDEO" },
  { title: "THE IDENTIFYING OF BORN-AGAIN BELIEVERS", date: "07032016", year: 2016, language: "ENG", city: "KETU", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MONDAY BIBLE STUDY", category: "BIBLE STUDY", type: "VIDEO" },
  { title: "THE MINISTRY OF FELLOW HELPERS IN GOSPEL PROPAGATION", date: "30052016", year: 2016, language: "ENG", city: "FESTAC", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MONDAY BIBLE STUDY", category: "BIBLE STUDY", type: "VIDEO" },
  { title: "THE PRE-EMINENCE OF DIVINE TRUTH", date: "09052016", year: 2016, language: "ENG", city: "AGEGE", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MONDAY BIBLE STUDY", category: "BIBLE STUDY", type: "VIDEO" },
  { title: "GIFT OF THE BODY", date: "06081992", year: 1992, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "CHURCH GROWTH CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "PURPOSE AND VISION OF AD2000", date: "10081992", year: 1992, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "MINISTER LUIS BUSH", series: "CHURCH GROWTH CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "ESTHER - GOD'S INSTRUMENT FOR NATIONAL SALVATION AND PRESERVATION", date: "15031995", year: 1995, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "NATIONAL WOMEN CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "MARY - DIVINELY APPROVED CHOICE WITH ETERNAL REWARD", date: "16031995", year: 1995, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "NATIONAL WOMEN CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "TESTIMONY", date: "031995", year: 1995, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "OTHER MINISTERS", series: "NATIONAL WOMEN CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "CENTRALITY OF THE SCRIPTURES IN MINISTRY", date: "21071994", year: 1994, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "NATIONAL MINISTERS CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "CHALLENGES FROM HEROES OF FAITH", date: "23071994", year: 1994, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "NATIONAL MINISTERS CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "CHRISTIAN MARRIAGE FAMILY LIFE PART II", date: "22071994", year: 1994, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "NATIONAL MINISTERS CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "TESTIMONY", date: "05102001", year: 2001, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "OTHER MINISTERS", series: "INTERNATIONAL WOMEN CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "THERE IS A BEGINNING", date: "02102001", year: 2001, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "INTERNATIONAL WOMEN CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "THE REDEMPTION THROUGH THE BLOOD OF JESUS", date: "31032006", year: 2006, language: "ENG-ELEME", city: "NULL", state: "NULL", country: "GHANA", minister: "PASTOR W.F KUMUYI", series: "GREAT MIRACLE CRUSADE", category: "CRUSADES", type: "VIDEO" },
  { title: "THE REDEMPTION THROUGH THE BLOOD OF JESUS", date: "31032006", year: 2006, language: "ENG-IKWERRE", city: "NULL", state: "NULL", country: "GHANA", minister: "PASTOR W.F KUMUYI", series: "GREAT MIRACLE CRUSADE", category: "CRUSADES", type: "VIDEO" },
  { title: "THE REDEMPTION THROUGH THE BLOOD OF JESUS", date: "31032006", year: 2006, language: "ENG-IKWERRE", city: "NULL", state: "NULL", country: "GHANA", minister: "PASTOR W.F KUMUYI", series: "GREAT MIRACLE CRUSADE", category: "CRUSADES", type: "VIDEO" },
  { title: "THE REDEMPTION THROUGH THE BLOOD OF JESUS", date: "31032006", year: 2006, language: "ENG-ITSEKIRI", city: "NULL", state: "NULL", country: "GHANA", minister: "PASTOR W.F KUMUYI", series: "GREAT MIRACLE CRUSADE", category: "CRUSADES", type: "VIDEO" },
  { title: "BASIC QUALITIES IN THE MINISTERS", date: "13052005", year: 2005, language: "ENG", city: "NULL", state: "RIVERS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "GREAT REVIVAL CRUSADE", category: "CRUSADES", type: "VIDEO" },
  { title: "BEHOLD HE COMETH", date: "17092005", year: 2005, language: "ENG", city: "NULL", state: "FCT", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MINISTERS CONFERENCE", category: "CONFERENCES", type: "VIDEO" },
  { title: "BEHOLD THE LAMB OF GOD", date: "10082005", year: 2005, language: "ENG", city: "NULL", state: "ABIA", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "GREAT REVIVAL CRUSADE", category: "CRUSADES", type: "VIDEO" },
  { title: "BORN BLESSED AND BAPTISE", date: "13112005", year: 2005, language: "ENG", city: "NULL", state: "EDO", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "GREAT REVIVAL CRUSADE", category: "CRUSADES", type: "VIDEO" },
  { title: "CHRISTS CONTINUING MINISTRY", date: "14082005", year: 2005, language: "ENG", city: "NULL", state: "ABIA", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "GREAT REVIVAL CRUSADE", category: "CRUSADES", type: "VIDEO" },
  { title: "ENTERING AND ENJOYING THE KINGDOM OF GOD", date: "12112005", year: 2005, language: "ENG", city: "NULL", state: "BENIN", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "GREAT REVIVAL CRUSADE", category: "CRUSADES", type: "VIDEO" },
  { title: "WISDOM FOR PROGRESSIVE WORK", date: "14032013", year: 2013, language: "ENG", city: "IBTC, AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "LEADERSHIP PLANNING MEETING", category: "LEADERS MEETING", type: "VIDEO" },
  { title: "WORKING IN THE MINISTRY THAT PLEASES GOD", date: "15032013", year: 2013, language: "ENG", city: "IBTC, AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "LEADERSHIP PLANNING MEETING", category: "LEADERS MEETING", type: "VIDEO" },
  { title: "WORKING WITH THE MASTER", date: "13032013", year: 2013, language: "ENG", city: "IBTC, AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "LEADERSHIP PLANNING MEETING", category: "LEADERS MEETING", type: "VIDEO" },
  { title: "FULFILLING THE DIVINELY APPOINTED MINISTRY", date: "02032016", year: 2016, language: "ENG", city: "IBTC, AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "LEADERSHIP PLANNING MEETING", category: "LEADERS MEETING", type: "VIDEO" },
  { title: "THE SECRET OF CONQUERING THROUGH CHRIST", date: "2016", year: 2016, language: "ENG-EDO", city: "BENIN", state: "EDO", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "LEADERSHIP PLANNING MEETING", category: "LEADERS MEETING", type: "VIDEO" },
  { title: "DEPENDABLE AND PROFITABLE CHRISTIAN LEADERS", date: "23022016", year: 2016, language: "ENG", city: "GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "TUESDAY LEADERSHIP MEETING", category: "LEADERS MEETING", type: "VIDEO" },
  { title: "EXAMINING THE MOTIVES OF OUR SERVICE", date: "19042016", year: 2016, language: "ENG", city: "ALIMOSHO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "TUESDAY LEADERSHIP MEETING", category: "LEADERS MEETING", type: "VIDEO" },
  { title: "GROWING A CHRIST CENTERED CHURCH ON COMMUNITY", date: "17052016", year: 2016, language: "ENG", city: "KETU", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "TUESDAY LEADERSHIP MEETING", category: "LEADERS MEETING", type: "VIDEO" },
  { title: "IRREPLACEABLE VIRTUE IN CHRISTIAN SERVICE", date: "29112016", year: 2016, language: "ENG", city: "ORILE", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "TUESDAY LEADERSHIP MEETING", category: "LEADERS MEETING", type: "VIDEO" },
  { title: "MAXIMIZING THE VALUE OF A SINGLE LIFE", date: "09022016", year: 2016, language: "ENG", city: "ONITSHA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "TUESDAY LEADERSHIP MEETING", category: "LEADERS MEETING", type: "VIDEO" },
  
  // Audio versions
  { title: "Q&A - ELISHA'S CALL AND ELIJAH'S", date: "04061995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "SEARCH THE SCRIPTURES", category: "SUNDAY SERVICE", type: "AUDIO" },
  { title: "Q&A - PETER'S DELIVERANCE AND HEROES DEATH", date: "31121995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "SEARCH THE SCRIPTURES", category: "SUNDAY SERVICE", type: "AUDIO" },
  { title: "Q&A - PRAYER OF REPENTANCE AND ABSOLUTE SURRENDER", date: "17121995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "SEARCH THE SCRIPTURES", category: "SUNDAY SERVICE", type: "AUDIO" },
  { title: "THE LORD'S SUPPER - OLD FESTAC", date: "24091994", year: 1994, language: "ENG-YOR", city: "OLD FESTAC", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "THE LORD'S SUPPER", category: "SUNDAY SERVICE", type: "AUDIO" },
  { title: "THE LORD'S SUPPER - KETU", date: "31121994", year: 1994, language: "ENG-YOR", city: "KETU", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "THE LORD'S SUPPER", category: "SUNDAY SERVICE", type: "AUDIO" },
  { title: "ABUNDANT LIFE IN GOD'S PRESENCE", date: "22011995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "WORSHIP SERVICE", category: "SUNDAY SERVICE", type: "AUDIO" },
  { title: "ANSWERING THE CALL TO EVANGELIZE", date: "10121995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "WORSHIP SERVICE", category: "SUNDAY SERVICE", type: "AUDIO" },
  { title: "GIVING AND CARING AMONGST BRETHREN", date: "25061995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "WORSHIP SERVICE", category: "SUNDAY SERVICE", type: "AUDIO" },
  { title: "GOD'S CALL TO THE OVERCOMING LIFE", date: "20011995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "COVENANT SERVICE", category: "SUNDAY SERVICE", type: "AUDIO" },
  { title: "GOD'S PLAN FOR YOUR LIFE", date: "01011995", year: 1995, language: "ENG-YOR", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "COVENANT SERVICE", category: "SUNDAY SERVICE", type: "AUDIO" },
  { title: "ASSURANCE OF SALVATION", date: "01021999", year: 1999, language: "ENG", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "YOUTH BIBLE STUDY", category: "BIBLE STUDY", type: "AUDIO" },
  { title: "VICTORY OVER TEMPTATION", date: "23031999", year: 1999, language: "ENG", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "YOUTH BIBLE STUDY", category: "BIBLE STUDY", type: "AUDIO" },
  { title: "DIVINE FAVOUR FOR THE UPRIGHT", date: "23022004", year: 2004, language: "ENG", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "YOUTH BIBLE STUDY", category: "BIBLE STUDY", type: "AUDIO" },
  { title: "PROFIT OF DIVINE COMPANIONSHIP", date: "03052004", year: 2004, language: "ENG", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "YOUTH BIBLE STUDY", category: "BIBLE STUDY", type: "AUDIO" },
  { title: "THE SECRETS OF SUCCESS", date: "24052004", year: 2004, language: "ENG", city: "OLD GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "YOUTH BIBLE STUDY", category: "BIBLE STUDY", type: "AUDIO" },
  { title: "THE FAITHFULNESS OF A CHRIST CENTERED CHURCH", date: "03102016", year: 2016, language: "ENG", city: "FESTAC", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MONDAY BIBLE STUDY", category: "BIBLE STUDY", type: "AUDIO" },
  { title: "THE FUTURE DESTINY OF SANCTIFIED CONQUERORS", date: "28112016", year: 2016, language: "ENG", city: "NULL", state: "NULL", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MONDAY BIBLE STUDY", category: "BIBLE STUDY", type: "AUDIO" },
  { title: "THE IDENTIFYING OF BORN-AGAIN BELIEVERS", date: "07032016", year: 2016, language: "ENG", city: "KETU", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MONDAY BIBLE STUDY", category: "BIBLE STUDY", type: "AUDIO" },
  { title: "THE MINISTRY OF FELLOW HELPERS IN GOSPEL PROPAGATION", date: "30052016", year: 2016, language: "ENG", city: "FESTAC", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MONDAY BIBLE STUDY", category: "BIBLE STUDY", type: "AUDIO" },
  { title: "THE PRE-EMINENCE OF DIVINE TRUTH", date: "09052016", year: 2016, language: "ENG", city: "AGEGE", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MONDAY BIBLE STUDY", category: "BIBLE STUDY", type: "AUDIO" },
  { title: "GIFT OF THE BODY", date: "06081992", year: 1992, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "CHURCH GROWTH CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "PURPOSE AND VISION OF AD2000", date: "10081992", year: 1992, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "MINISTER LUIS BUSH", series: "CHURCH GROWTH CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "ESTHER - GOD'S INSTRUMENT FOR NATIONAL SALVATION AND PRESERVATION", date: "15031995", year: 1995, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "NATIONAL WOMEN CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "MARY - DIVINELY APPROVED CHOICE WITH ETERNAL REWARD", date: "16031995", year: 1995, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "NATIONAL WOMEN CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "TESTIMONY", date: "031995", year: 1995, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "OTHER MINISTERS", series: "NATIONAL WOMEN CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "CENTRALITY OF THE SCRIPTURES IN MINISTRY", date: "21071994", year: 1994, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "NATIONAL MINISTERS CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "CHALLENGES FROM HEROES OF FAITH", date: "23071994", year: 1994, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "NATIONAL MINISTERS CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "CHRISTIAN MARRIAGE FAMILY LIFE PART II", date: "22071994", year: 1994, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "NATIONAL MINISTERS CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "TESTIMONY", date: "05102001", year: 2001, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "OTHER MINISTERS", series: "INTERNATIONAL WOMEN CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "THERE IS A BEGINNING", date: "02102001", year: 2001, language: "ENG", city: "IBTC AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "INTERNATIONAL WOMEN CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "THE REDEMPTION THROUGH THE BLOOD OF JESUS", date: "31032006", year: 2006, language: "ENG-ELEME", city: "NULL", state: "NULL", country: "GHANA", minister: "PASTOR W.F KUMUYI", series: "GREAT MIRACLE CRUSADE", category: "CRUSADES", type: "AUDIO" },
  { title: "THE REDEMPTION THROUGH THE BLOOD OF JESUS", date: "31032006", year: 2006, language: "ENG-IKWERRE", city: "NULL", state: "NULL", country: "GHANA", minister: "PASTOR W.F KUMUYI", series: "GREAT MIRACLE CRUSADE", category: "CRUSADES", type: "AUDIO" },
  { title: "THE REDEMPTION THROUGH THE BLOOD OF JESUS", date: "31032006", year: 2006, language: "ENG-IKWERRE", city: "NULL", state: "NULL", country: "GHANA", minister: "PASTOR W.F KUMUYI", series: "GREAT MIRACLE CRUSADE", category: "CRUSADES", type: "AUDIO" },
  { title: "THE REDEMPTION THROUGH THE BLOOD OF JESUS", date: "31032006", year: 2006, language: "ENG-ITSEKIRI", city: "NULL", state: "NULL", country: "GHANA", minister: "PASTOR W.F KUMUYI", series: "GREAT MIRACLE CRUSADE", category: "CRUSADES", type: "AUDIO" },
  { title: "BASIC QUALITIES IN THE MINISTERS", date: "13052005", year: 2005, language: "ENG", city: "NULL", state: "RIVERS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "GREAT REVIVAL CRUSADE", category: "CRUSADES", type: "AUDIO" },
  { title: "BEHOLD HE COMETH", date: "17092005", year: 2005, language: "ENG", city: "NULL", state: "FCT", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "MINISTERS CONFERENCE", category: "CONFERENCES", type: "AUDIO" },
  { title: "BEHOLD THE LAMB OF GOD", date: "10082005", year: 2005, language: "ENG", city: "NULL", state: "ABIA", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "GREAT REVIVAL CRUSADE", category: "CRUSADES", type: "AUDIO" },
  { title: "BORN BLESSED AND BAPTISE", date: "13112005", year: 2005, language: "ENG", city: "NULL", state: "EDO", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "GREAT REVIVAL CRUSADE", category: "CRUSADES", type: "AUDIO" },
  { title: "CHRISTS CONTINUING MINISTRY", date: "14082005", year: 2005, language: "ENG", city: "NULL", state: "ABIA", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "GREAT REVIVAL CRUSADE", category: "CRUSADES", type: "AUDIO" },
  { title: "ENTERING AND ENJOYING THE KINGDOM OF GOD", date: "12112005", year: 2005, language: "ENG", city: "NULL", state: "BENIN", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "GREAT REVIVAL CRUSADE", category: "CRUSADES", type: "AUDIO" },
  { title: "WISDOM FOR PROGRESSIVE WORK", date: "14032013", year: 2013, language: "ENG", city: "IBTC, AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "LEADERSHIP PLANNING MEETING", category: "LEADERS MEETING", type: "AUDIO" },
  { title: "WORKING IN THE MINISTRY THAT PLEASES GOD", date: "15032013", year: 2013, language: "ENG", city: "IBTC, AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "LEADERSHIP PLANNING MEETING", category: "LEADERS MEETING", type: "AUDIO" },
  { title: "WORKING WITH THE MASTER", date: "13032013", year: 2013, language: "ENG", city: "IBTC, AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "LEADERSHIP PLANNING MEETING", category: "LEADERS MEETING", type: "AUDIO" },
  { title: "FULFILLING THE DIVINELY APPOINTED MINISTRY", date: "02032016", year: 2016, language: "ENG", city: "IBTC, AYOBO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "LEADERSHIP PLANNING MEETING", category: "LEADERS MEETING", type: "AUDIO" },
  { title: "THE SECRET OF CONQUERING THROUGH CHRIST", date: "2016", year: 2016, language: "ENG-EDO", city: "BENIN", state: "EDO", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "LEADERSHIP PLANNING MEETING", category: "LEADERS MEETING", type: "AUDIO" },
  { title: "DEPENDABLE AND PROFITABLE CHRISTIAN LEADERS", date: "23022016", year: 2016, language: "ENG", city: "GBAGADA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "TUESDAY LEADERSHIP MEETING", category: "LEADERS MEETING", type: "AUDIO" },
  { title: "EXAMINING THE MOTIVES OF OUR SERVICE", date: "19042016", year: 2016, language: "ENG", city: "ALIMOSHO", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "TUESDAY LEADERSHIP MEETING", category: "LEADERS MEETING", type: "AUDIO" },
  { title: "GROWING A CHRIST CENTERED CHURCH ON COMMUNITY", date: "17052016", year: 2016, language: "ENG", city: "KETU", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "TUESDAY LEADERSHIP MEETING", category: "LEADERS MEETING", type: "AUDIO" },
  { title: "IRREPLACEABLE VIRTUE IN CHRISTIAN SERVICE", date: "29112016", year: 2016, language: "ENG", city: "ORILE", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "TUESDAY LEADERSHIP MEETING", category: "LEADERS MEETING", type: "AUDIO" },
  { title: "MAXIMIZING THE VALUE OF A SINGLE LIFE", date: "09022016", year: 2016, language: "ENG", city: "ONITSHA", state: "LAGOS", country: "NIGERIA", minister: "PASTOR W.F KUMUYI", series: "TUESDAY LEADERSHIP MEETING", category: "LEADERS MEETING", type: "AUDIO" },
];

// Series-specific thumbnails
const seriesThumbnails: Record<string, string> = {
  "SEARCH THE SCRIPTURES": "https://images.unsplash.com/photo-1696652719717-cd4c0f73c5b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWFyY2glMjBzY3JpcHR1cmVzJTIwYmlibGUlMjB2ZXJzZXN8ZW58MXx8fHwxNzU2OTExMjA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "THE LORD'S SUPPER": "https://images.unsplash.com/photo-1649163572174-01e4d79d03d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb3JkcyUyMHN1cHBlciUyMGNvbW11bmlvbiUyMGJyZWFkJTIwd2luZXxlbnwxfHx8fDE3NTY5MTEyMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "WORSHIP SERVICE": "https://images.unsplash.com/photo-1716666179273-a74f3018c72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb25ncmVnYXRpb24lMjB3b3JzaGlwJTIwc2VydmljZXxlbnwxfHx8fDE3NTY5MTExODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "COVENANT SERVICE": "https://images.unsplash.com/photo-1716666179273-a74f3018c72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb25ncmVnYXRpb24lMjB3b3JzaGlwJTIwc2VydmljZXxlbnwxfHx8fDE3NTY5MTExODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "YOUTH BIBLE STUDY": "https://images.unsplash.com/photo-1672867138294-8aa5591041de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3V0aCUyMGJpYmxlJTIwc3R1ZHklMjB5b3VuZyUyMHBlb3BsZXxlbnwxfHx8fDE3NTY5MTEyMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "MONDAY BIBLE STUDY": "https://images.unsplash.com/photo-1663162550928-2c2389cdb27d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5JTIwc21hbGwlMjBncm91cHxlbnwxfHx8fDE3NTY5MTExODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "CHURCH GROWTH CONFERENCE": "https://images.unsplash.com/photo-1617196288062-49bf97a38d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb25mZXJlbmNlJTIwY29udmVudGlvbnxlbnwxfHx8fDE3NTY5MTExOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "NATIONAL WOMEN CONFERENCE": "https://images.unsplash.com/photo-1663202176413-3652ad8d89d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNvbmZlcmVuY2UlMjBjaHJpc3RpYW4lMjBsYWRpZXN8ZW58MXx8fHwxNzU2OTExMjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "NATIONAL MINISTERS CONFERENCE": "https://images.unsplash.com/photo-1729655917624-2403d48a875e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pc3RlcnMlMjBjb25mZXJlbmNlJTIwcGFzdG9ycyUyMGdhdGhlcmluZ3xlbnwxfHx8fDE3NTY5MTEyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "INTERNATIONAL WOMEN CONFERENCE": "https://images.unsplash.com/photo-1663202176413-3652ad8d89d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21lbiUyMGNvbmZlcmVuY2UlMjBjaHJpc3RpYW4lMjBsYWRpZXN8ZW58MXx8fHwxNzU2OTExMjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "GREAT MIRACLE CRUSADE": "https://images.unsplash.com/photo-1546237700-92604d8a65a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZXZhbmdlbGlzbSUyMGNydXNhZGUlMjByZXZpdmFsfGVufDF8fHx8MTc1NjkxMTE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "GREAT REVIVAL CRUSADE": "https://images.unsplash.com/photo-1546237700-92604d8a65a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZXZhbmdlbGlzbSUyMGNydXNhZGUlMjByZXZpdmFsfGVufDF8fHx8MTc1NjkxMTE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "MINISTERS CONFERENCE": "https://images.unsplash.com/photo-1729655917624-2403d48a875e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pc3RlcnMlMjBjb25mZXJlbmNlJTIwcGFzdG9ycyUyMGdhdGhlcmluZ3xlbnwxfHx8fDE3NTY5MTEyMjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "LEADERSHIP PLANNING MEETING": "https://images.unsplash.com/photo-1591115306400-b18a7160c65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBsZWFkZXJzaGlwJTIwbWVldGluZyUyMHBhc3RvcnN8ZW58MXx8fHwxNzU2OTExMjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "TUESDAY LEADERSHIP MEETING": "https://images.unsplash.com/photo-1591115306400-b18a7160c65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBsZWFkZXJzaGlwJTIwbWVldGluZyUyMHBhc3RvcnN8ZW58MXx8fHwxNzU2OTExMjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

// Category-specific thumbnails
const categoryThumbnails: Record<string, string> = {
  "SUNDAY SERVICE": "https://images.unsplash.com/photo-1716666179273-a74f3018c72e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb25ncmVnYXRpb24lMjB3b3JzaGlwJTIwc2VydmljZXxlbnwxfHx8fDE3NTY5MTExODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "BIBLE STUDY": "https://images.unsplash.com/photo-1663162550928-2c2389cdb27d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5JTIwc21hbGwlMjBncm91cHxlbnwxfHx8fDE3NTY5MTExODd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "CONFERENCES": "https://images.unsplash.com/photo-1617196288062-49bf97a38d9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb25mZXJlbmNlJTIwY29udmVudGlvbnxlbnwxfHx8fDE3NTY5MTExOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "CRUSADES": "https://images.unsplash.com/photo-1546237700-92604d8a65a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwZXZhbmdlbGlzbSUyMGNydXNhZGUlMjByZXZpdmFsfGVufDF8fHx8MTc1NjkxMTE5OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "LEADERS MEETING": "https://images.unsplash.com/photo-1591115306400-b18a7160c65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBsZWFkZXJzaGlwJTIwbWVldGluZyUyMHBhc3RvcnN8ZW58MXx8fHwxNzU2OTExMjAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};

// Helper functions
function formatDate(dateStr: string): string {
  if (dateStr === "2016" || dateStr.length === 4) {
    return `Jan 1, ${dateStr}`;
  }
  
  if (dateStr.length === 6) { // MMYYYY format like "031995"
    const month = dateStr.substring(0, 2);
    const year = dateStr.substring(2);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  }
  
  if (dateStr.length === 8) { // DDMMYYYY format
    const day = dateStr.substring(0, 2);
    const month = dateStr.substring(2, 4);
    const year = dateStr.substring(4);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
  }
  
  return dateStr;
}

function generateId(item: any, index: number): string {
  return `${item.type.toLowerCase()}-${index + 1}-${item.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`;
}

function generateDuration(): string {
  const minutes = Math.floor(Math.random() * 60) + 15; // 15-75 minutes
  const seconds = Math.floor(Math.random() * 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function generateViews(): number {
  return Math.floor(Math.random() * 50000) + 1000; // 1K-50K views
}

function getLanguageDisplay(language: string): string {
  const langMap: Record<string, string> = {
    "ENG": "English",
    "ENG-YOR": "English/Yoruba",
    "ENG-ELEME": "English/Eleme",
    "ENG-IKWERRE": "English/Ikwerre",
    "ENG-ITSEKIRI": "English/Itsekiri",
    "ENG-EDO": "English/Edo"
  };
  return langMap[language] || language;
}

function generateTags(item: any): string[] {
  const tags = [item.category.toLowerCase().replace(/\s+/g, '-')];
  
  if (item.minister.includes('PASTOR W.F KUMUYI')) {
    tags.push('pastor-kumuyi');
  }
  
  if (item.language.includes('YOR')) tags.push('yoruba');
  if (item.language.includes('ENG')) tags.push('english');
  if (item.country === 'GHANA') tags.push('ghana');
  if (item.country === 'NIGERIA') tags.push('nigeria');
  
  // Add series-specific tags
  if (item.series.includes('WOMEN')) tags.push('women');
  if (item.series.includes('YOUTH')) tags.push('youth');
  if (item.series.includes('LEADERSHIP')) tags.push('leadership');
  if (item.series.includes('CRUSADE')) tags.push('crusade');
  
  return tags;
}

function generateDescription(item: any): string {
  const location = item.city !== "NULL" && item.state !== "NULL" 
    ? `${item.city}, ${item.state}, ${item.country}`
    : item.country;
    
  return `A powerful message from ${item.minister} delivered during ${item.series} in ${location}. This ${item.type.toLowerCase()} recording captures the essence of biblical teaching and spiritual guidance for believers.`;
}

function formatCategoryName(category: string): string {
  // Convert all caps categories to proper case for display
  const categoryMap: Record<string, string> = {
    "SUNDAY SERVICE": "Sunday Service",
    "BIBLE STUDY": "Bible Study", 
    "CONFERENCES": "Conferences",
    "CRUSADES": "Crusades",
    "LEADERS MEETING": "Leaders Meeting"
  };
  
  return categoryMap[category] || category;
}

// Process and enhance the raw data
export const mediaItems: MediaItem[] = rawMediaData.map((item, index) => ({
  id: generateId(item, index),
  title: item.title,
  date: formatDate(item.date),
  year: item.year,
  language: getLanguageDisplay(item.language),
  city: item.city === "NULL" ? "" : item.city,
  state: item.state === "NULL" ? "" : item.state,
  country: item.country,
  minister: item.minister,
  series: item.series,
  category: formatCategoryName(item.category), // Format category name for better display
  type: item.type as 'VIDEO' | 'AUDIO',
  
  // Enhanced metadata
  duration: generateDuration(),
  views: generateViews(),
  thumbnail: seriesThumbnails[item.series] || categoryThumbnails[item.category] || `https://images.unsplash.com/photo-${1500000000000 + index}?w=400&h=300&fit=crop&crop=center`,
  isFavorite: Math.random() > 0.8, // 20% chance of being favorited
  isInPlaylist: Math.random() > 0.7, // 30% chance of being in a playlist
  description: generateDescription(item),
  tags: generateTags(item),
  downloadUrl: `https://media.dclm.org/downloads/${generateId(item, index)}.${item.type.toLowerCase() === 'video' ? 'mp4' : 'mp3'}`,
  streamUrl: `https://media.dclm.org/stream/${generateId(item, index)}`,
  fileSize: item.type === 'VIDEO' ? `${Math.floor(Math.random() * 500) + 100}MB` : `${Math.floor(Math.random() * 50) + 10}MB`,
  quality: item.type === 'VIDEO' ? '720p' : '128kbps',
}));

// Create series data
export const seriesData: SeriesInfo[] = Array.from(new Set(rawMediaData.map(item => item.series)))
  .map((seriesName, index) => {
    const seriesItems = mediaItems.filter(item => item.series === seriesName);
    const category = seriesItems[0]?.category || "GENERAL";
    const ministers = Array.from(new Set(seriesItems.map(item => item.minister)));
    
    // Calculate total duration (simplified)
    const totalMinutes = seriesItems.reduce((sum, item) => {
      const duration = item.duration.split(':');
      const minutes = parseInt(duration[1]) + (parseInt(duration[0]) * 60);
      return sum + minutes;
    }, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const totalDuration = `${totalHours}h ${remainingMinutes}m`;
    
    // Get earliest date as start date
    const dates = seriesItems.map(item => new Date(item.date)).sort((a, b) => a.getTime() - b.getTime());
    const startDate = dates[0]?.getFullYear().toString() || '1990';
    
    return {
      id: `series-${index + 1}-${seriesName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`,
      name: seriesName,
      description: `A comprehensive series of messages focusing on ${seriesName.toLowerCase()}. Features inspiring teachings and biblical insights.`,
      thumbnail: seriesThumbnails[seriesName] || categoryThumbnails[category] || `https://images.unsplash.com/photo-${1600000000000 + index}?w=600&h=400&fit=crop&crop=center`,
      totalEpisodes: seriesItems.length,
      totalViews: seriesItems.reduce((sum, item) => sum + item.views, 0),
      totalDuration,
      startDate,
      category,
      ministers,
      speakers: ministers, // Same as ministers for compatibility
      mediaItems: seriesItems,
    };
  });

// Create category data
export const categoryData: CategoryInfo[] = Array.from(new Set(rawMediaData.map(item => item.category)))
  .map((categoryName, index) => {
    const formattedCategoryName = formatCategoryName(categoryName);
    const categoryItems = mediaItems.filter(item => item.category === formattedCategoryName);
    const colors = ["#003A7C", "#87CEFA", "#FFC107", "#E68800", "#6A0DAD"];
    const bgColors: ('orange' | 'teal' | 'blue' | 'purple' | 'gold')[] = ['blue', 'teal', 'orange', 'purple', 'gold'];
    
    // Get unique series in this category
    const seriesInCategory = Array.from(new Set(categoryItems.map(item => item.series)));
    
    // Calculate total duration (simplified)
    const totalMinutes = categoryItems.reduce((sum, item) => {
      const duration = item.duration.split(':');
      const minutes = parseInt(duration[1]) + (parseInt(duration[0]) * 60);
      return sum + minutes;
    }, 0);
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    const totalDuration = `${totalHours}h ${remainingMinutes}m`;
    
    return {
      id: `category-${index + 1}-${formattedCategoryName.replace(/[^a-z0-9]/gi, '-').toLowerCase()}`,
      name: formattedCategoryName,
      description: `Messages and teachings from ${formattedCategoryName.toLowerCase()} gatherings and events.`,
      thumbnail: categoryThumbnails[categoryName] || `https://images.unsplash.com/photo-${1700000000000 + index}?w=600&h=400&fit=crop&crop=center`,
      color: colors[index % colors.length],
      bgColor: bgColors[index % bgColors.length],
      totalContent: categoryItems.length,
      seriesCount: seriesInCategory.length,
      totalViews: `${Math.floor(categoryItems.reduce((sum, item) => sum + item.views, 0) / 1000)}K`,
      totalDuration,
      mediaItems: categoryItems,
    };
  });

// Helper functions for filtering and searching
export function getMediaByType(type: 'VIDEO' | 'AUDIO'): MediaItem[] {
  return mediaItems.filter(item => item.type === type);
}

export function getMediaByCategory(category: string, type?: 'VIDEO' | 'AUDIO'): MediaItem[] {
  let filtered = mediaItems.filter(item => item.category === category);
  if (type) {
    filtered = filtered.filter(item => item.type === type);
  }
  return filtered;
}

export function getMediaBySeries(series: string, type?: 'VIDEO' | 'AUDIO'): MediaItem[] {
  let filtered = mediaItems.filter(item => item.series === series);
  if (type) {
    filtered = filtered.filter(item => item.type === type);
  }
  return filtered;
}

export function getMediaByMinister(minister: string, type?: 'VIDEO' | 'AUDIO'): MediaItem[] {
  let filtered = mediaItems.filter(item => item.minister === minister);
  if (type) {
    filtered = filtered.filter(item => item.type === type);
  }
  return filtered;
}

export function searchMedia(query: string, type?: 'VIDEO' | 'AUDIO'): MediaItem[] {
  const lowercaseQuery = query.toLowerCase();
  let filtered = mediaItems.filter(item =>
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.minister.toLowerCase().includes(lowercaseQuery) ||
    item.series.toLowerCase().includes(lowercaseQuery) ||
    item.category.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.includes(lowercaseQuery))
  );
  
  if (type) {
    filtered = filtered.filter(item => item.type === type);
  }
  
  return filtered;
}

export function getMediaById(id: string): MediaItem | undefined {
  return mediaItems.find(item => item.id === id);
}

export function getRelatedMedia(mediaId: string, limit: number = 5): MediaItem[] {
  const currentItem = getMediaById(mediaId);
  if (!currentItem) return [];
  
  // Get related items from same series first, then same category, then same minister
  const related = mediaItems.filter(item => 
    item.id !== mediaId && 
    item.type === currentItem.type &&
    (item.series === currentItem.series || 
     item.category === currentItem.category || 
     item.minister === currentItem.minister)
  );
  
  return related.slice(0, limit);
}

// Get unique values for filters
export function getUniqueCategories(): string[] {
  return Array.from(new Set(mediaItems.map(item => item.category))).sort();
}

export function getUniqueSeries(): string[] {
  return Array.from(new Set(mediaItems.map(item => item.series))).sort();
}

export function getUniqueInitisters(): string[] {
  return Array.from(new Set(mediaItems.map(item => item.minister))).sort();
}

export function getUniqueLanguages(): string[] {
  return Array.from(new Set(mediaItems.map(item => item.language))).sort();
}

// Statistics for admin dashboard
export function getMediaStats() {
  const totalVideos = getMediaByType('VIDEO').length;
  const totalAudios = getMediaByType('AUDIO').length;
  const totalViews = mediaItems.reduce((sum, item) => sum + item.views, 0);
  const totalSeries = seriesData.length;
  const totalCategories = categoryData.length;
  
  // Monthly data (simulated based on years)
  const yearlyData = mediaItems.reduce((acc, item) => {
    const year = item.year;
    if (!acc[year]) {
      acc[year] = { videos: 0, audios: 0 };
    }
    if (item.type === 'VIDEO') {
      acc[year].videos++;
    } else {
      acc[year].audios++;
    }
    return acc;
  }, {} as Record<number, { videos: number; audios: number }>);
  
  return {
    totalVideos,
    totalAudios,
    totalViews,
    totalSeries,
    totalCategories,
    yearlyData,
    categoryDistribution: categoryData.map(cat => ({
      name: cat.name,
      value: cat.totalContent,
      color: cat.color
    })),
    topSeries: seriesData
      .sort((a, b) => b.totalViews - a.totalViews)
      .slice(0, 5),
    recentContent: mediaItems
      .sort((a, b) => b.year - a.year)
      .slice(0, 10)
  };
}