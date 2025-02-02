using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Homework_5
{
    public class Actions
    {
        public string stringConcat(string word1, string word2)
        {
            string word3 = string.Concat(word1, word2);
            return word3;
        }

        public bool stringEquals(string word3, string word4)
        {
            return word3.Equals(word4, StringComparison.Ordinal);
        }

        public bool stringContains(string text, string word5)
        {
            return text.Contains(word5);
        }

        public string stringSubstring(string text1, int startIndex, int length)
        {
            return text1.Substring(startIndex, length);
        }

        public string stringInsert(string text2, int startIndex1, string addedWord)
        {
            return text2.Insert(startIndex1, addedWord);
        }

        public string stringRemove(string text3, string deleteString)
        {
            int index = text3.IndexOf(deleteString);
            if (index >= 0)
            {
                return text3.Remove(index, deleteString.Length);
            }
            return text3;
        }

        public string[] stringSplit(string text4, char bracket)
        {
            return text4.Split(bracket);
        }

        public string stringReplace(string text5, string replaceText, string newText2)
        {
            return text5.Replace(replaceText, newText2);
        }

        public string stringTrim(string textTrim)
        {
            return textTrim.Trim();
        }

        public int stringIndexOf(string text6, string textSearch)
        {
            return text6.IndexOf(textSearch);
        }

        public void PrintDay(DaysOfWeek day)
        {
            Console.WriteLine($"The selected day is: {day}");
        }
    }
}
