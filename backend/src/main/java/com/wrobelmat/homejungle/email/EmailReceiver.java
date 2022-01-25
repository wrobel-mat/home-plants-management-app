package com.wrobelmat.homejungle.email;

public interface EmailReceiver {
    void receiveEmail(byte[] mimeByteArray);
}
