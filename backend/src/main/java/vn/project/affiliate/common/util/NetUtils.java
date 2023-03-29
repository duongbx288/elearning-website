package vn.project.affiliate.common.util;

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.net.InetAddress;
import java.net.UnknownHostException;

public final class NetUtils {

    public static boolean isPrivateIP(String ip) {
        InetAddress address;
        try {
            address = InetAddress.getByName(ip);
        } catch (UnknownHostException exception) {
            return false;
        }
        return address.isSiteLocalAddress() || address.isAnyLocalAddress() || address.isLinkLocalAddress()
                || address.isLoopbackAddress() || address.isMulticastAddress();
    }

    public static boolean isPrivateIP(HttpServletRequest request) {
        return isPrivateIP(getRemoteIP(request));
    }

    public static String getRemoteIP(HttpServletRequest request) {
        String ip = request.getHeader("X-Real-IP");
        if (null != ip && !"".equals(ip.trim()) && !"unknown".equalsIgnoreCase(ip)) {
            return ip;
        }
        ip = request.getHeader("X-Forwarded-For");
        if (null != ip && !"".equals(ip.trim()) && !"unknown".equalsIgnoreCase(ip)) {
            // get first ip from proxy ip
            int index = ip.indexOf(',');
            if (index != -1) {
                return ip.substring(0, index);
            } else {
                return ip;
            }
        }
        return request.getRemoteAddr();
    }

    public static String buildUri(String[] args) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < args.length; i++) {
            if (StringUtils.isEmpty(args[i]))
                continue;

            builder.append(args[i]);
            if (i != (args.length - 1))
                builder.append("/");
        }
        return builder.toString().replace("//", "/");
    }

}
