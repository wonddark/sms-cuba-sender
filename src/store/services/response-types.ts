export type LoginResponse = {
  toke: string;
  refresh_token: string;
  refresh_token_expiration: number;
};

export type ContactsResponse = {
  "hydra:member": [
    {
      "@context": string;
      "@id": string;
      "@type": string;
      id: number;
      name: string;
      phone: string;
      user: string;
      messages: string[];
    }
  ];
  "hydra:totalItems": number;
  "hydra:view": {
    "@id": string;
    "@type": string;
    "hydra:first": string;
    "hydra:last": string;
    "hydra:previous": string;
    "hydra:next": string;
  };
  "hydra:search": {
    "@type": string;
    "hydra:template": string;
    "hydra:variableRepresentation": string;
    "hydra:mapping": [
      {
        "@type": string;
        variable: string;
        property: string;
        required: boolean;
      }
    ];
  };
};
