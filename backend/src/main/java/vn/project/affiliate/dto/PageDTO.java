package vn.project.affiliate.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private int websiteId;
    private String pageName;
    private String webDomain;
    private String pageUrl;
    private Instant createdDate;
    private Instant lastModifiedDate;
    private String createdBy;
    private String lastModifiedBy;

}
