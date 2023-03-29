package vn.project.affiliate.common;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.collections4.CollectionUtils;
import vn.project.affiliate.dto.request.LoginRequest;

import java.util.List;

public final class Util {
    private Util() {
    }

    public static boolean checkAuthenticate(List<String> users, LoginRequest request) {
        if (CollectionUtils.isNotEmpty(users)) {
            return users.get(1).equals(request.getPassword());
        }
        return false;
    }

    public static byte[] base64ToByte(String base64Str) {
        return Base64.decodeBase64(base64Str);
    }
}
