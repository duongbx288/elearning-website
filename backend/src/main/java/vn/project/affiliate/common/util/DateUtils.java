package vn.project.affiliate.common.util;

import lombok.val;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.*;

public final class DateUtils {

    public static final List<? extends DateTimeFormatter> DATE_FORMATS = Arrays.asList(
            DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"), DateTimeFormat.forPattern("yyyy-MM-dd  HH:mm:ss"),
            DateTimeFormat.forPattern("yyyy-MM-dd HH:mm"), DateTimeFormat.forPattern("yyyy-MM-dd"),
            DateTimeFormat.forPattern("yyyyMMdd"), DateTimeFormat.forPattern("yyyy-MM-dd HH:mm:ss.SSS"),
            DateTimeFormat.forPattern("dd-MM-yyy"), DateTimeFormat.forPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"));

    public static boolean isEqual(Date date1, Date date2) {
        if (date1 == null) {
            if (date2 == null)
                return true;
            return false;
        }
        if (date2 == null)
            return false;
        return date1.compareTo(date2) == 0;
    }

    public static Date getMax(List<Date> dates) {
        SortedSet<Date> sortedSet = new TreeSet<Date>(dates);
        Date max = sortedSet.last();
        return max;
    }

    public static Date convertUtcToLocal(Date utcDate) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        format.setTimeZone(TimeZone.getTimeZone("Asia/Saigon"));
        String formatedText = format.format(utcDate);
        Date result = convertToDate(formatedText);
        return result;
    }

    public static long subtractDateBySecond(Date begin, Date end) {
        long beginTime = begin.getTime();
        long endTime = end.getTime();
        long resultByMilisecond = endTime - beginTime;
        return Math.abs(resultByMilisecond / 1000);
    }

    public static int getMinuteCountFromBeginDay(String timeText) {
        String[] elements = StringUtils.split(timeText, ':');
        return Integer.parseInt(elements[0]) * 60 + Integer.parseInt(elements[1]);
    }

    public static List<Date> convertFromJoinedTextToListDate(String text) {
        if (StringUtils.isBlank(text))
            return null;
        List<Date> result = new ArrayList<Date>();
        List<String> textElements = Arrays.asList(StringUtils.split(text, ','));
        for (String textElement : textElements) {
            Date date = convertToDate(textElement);
            result.add(date);
        }
        return result;
    }

    public static String convertDateToStandardText(Date date) {
        String formatPattern = "yyyy-MM-dd'T'HH:mm:ss'Z'";
        if (date == null)
            return null;
        DateFormat df = new SimpleDateFormat(formatPattern);
        String textRepresentation = df.format(date);
        return textRepresentation;
    }

    public static Date getUTC() {
        ZonedDateTime now = ZonedDateTime.now(ZoneOffset.UTC);
        return Date.from(now.toInstant());
    }


    public static Date addDate(Date source, int days) {
        val c = Calendar.getInstance();
        c.setTime(source);
        c.add(Calendar.DATE, days);
        return c.getTime();
    }

    public static Date addMinutes(Date source, int minutes) {
        val c = Calendar.getInstance();
        c.setTime(source);
        c.add(Calendar.MINUTE, minutes);
        return c.getTime();
    }

    public static Date convertToLocal(Date date) {
        if (date == null)
            return null;
        ZonedDateTime zoneDateTime = ZonedDateTime.ofInstant(date.toInstant(), ZoneId.of("UTC"));
        ZonedDateTime localZoneDateTime = zoneDateTime.withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"));
        ZonedDateTime zoneDateTimeSameLocal = localZoneDateTime.withZoneSameLocal(ZoneId.of("UTC"));
        return Date.from(zoneDateTimeSameLocal.toInstant());
    }

    public static Date getNow() {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        format.setTimeZone(TimeZone.getTimeZone("Asia/Saigon"));
        String formatedText = format.format(getUTC());
        Date result = convertToDate(formatedText);

        return result;
    }

    public static String formatDate(Date date, String format) {
        // Create an instance of SimpleDateFormat used for formatting
        // the string representation of date (month/day/year)
        DateFormat df = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");

        // Get the date today using Calendar object.
        // Using DateFormat format method we can create a string
        // representation of a date with the defined format.
        return df.format(date);
    }


    public static Date convertToDate(String source) {
        if (!StringUtils.isBlank(source)) {
            for (val fmt : DATE_FORMATS) {
                try {
                    val d = fmt.parseLocalDateTime(source);

                    return d.toDate();
                } catch (IllegalArgumentException e) {
                    continue;
                }
            }
        }
        return null;
    }

    public static Date addDays(Date date, int days) {
        if (date == null)
            return null;
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.add(Calendar.DATE, days); // minus number would decrement the days
        return cal.getTime();
    }

    public static Date convertToDateWithoutTime(String source) {
        if (!StringUtils.isBlank(source)) {
            val fmt = DateTimeFormat.forPattern("yyyy-MM-dd");
            try {
                val d = fmt.parseLocalDateTime(source);
                return d.toDate();
            } catch (IllegalArgumentException e) {
            }
        }
        return null;
    }

    public static int genLocalDateKey(Date date) {
        if (date == null)
            return 0;
        ZonedDateTime localZoneDateTime = ZonedDateTime.ofInstant(date.toInstant(), ZoneId.of("Asia/Ho_Chi_Minh"));
        String sYear = String.valueOf(localZoneDateTime.getYear());
        String sMonth = String.valueOf(localZoneDateTime.getMonthValue());
        if (sMonth.length() == 1) {
            sMonth = "0" + sMonth;
        }
        String sDate = String.valueOf(localZoneDateTime.getDayOfMonth());
        if (sDate.length() == 1) {
            sDate = "0" + sDate;
        }
        return Integer.parseInt(sYear + sMonth + sDate);
    }
}
