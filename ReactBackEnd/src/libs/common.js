/**
 * Created by jf on 16/1/14.
 */
class StringUtil {
   static replaceAll(s,s1,s2){
　　    return s.replace(new RegExp(s1,"gm"),s2);
　　}
}

export {StringUtil};
