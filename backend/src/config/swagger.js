import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trimmy API",
      version: "1.0.0",
      description: "Production-grade URL Shortener & Analytics API",
    },
    servers: [
      { url: "http://localhost:8000" },
      { url: "https://trimmy.onrender.com" },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "uuid" },
            email: { type: "string", example: "user@example.com" },
            isEmailVerified: { type: "boolean", example: false },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        URL: {
          type: "object",
          properties: {
            id: { type: "string" },
            shortCode: { type: "string", example: "abc123" },
            shortUrl: { type: "string", example: "https://trimmy.io/abc123" },
            originalUrl: { type: "string" },
            totalClicks: { type: "integer", example: 120 },
            createdAt: { type: "string", format: "date-time" },
          },
        },

        Analytics: {
          type: "object",
          properties: {
            totalClicks: { type: "integer" },
            mobileClicks: { type: "integer" },
            desktopClicks: { type: "integer" },
            countries: {
              type: "object",
              additionalProperties: { type: "integer" },
              example: { India: 50, USA: 30 },
            },
          },
        },

        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
          },
        },
      },
    },

    security: [{ bearerAuth: [] }],

    paths: {
      // ================= AUTH =================

      "/api/v1/auth/signup": {
        post: {
          tags: ["Auth"],
          summary: "Register user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User created" },
            400: {
              description: "Bad request",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },

      "/api/v1/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Login success",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      token: { type: "string" },
                      user: { $ref: "#/components/schemas/User" },
                    },
                  },
                },
              },
            },
          },
        },
      },

      "/api/v1/auth/verify-email": {
        get: {
          tags: ["Auth"],
          summary: "Verify email",
          parameters: [
            {
              name: "token",
              in: "query",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Email verified" },
          },
        },
      },

      "/api/v1/auth/forgot-password": {
        post: {
          tags: ["Auth"],
          summary: "Send reset password email",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: { email: { type: "string" } },
                },
              },
            },
          },
          responses: {
            200: { description: "Email sent" },
          },
        },
      },

      "/api/v1/auth/reset-password": {
        post: {
          tags: ["Auth"],
          summary: "Reset password",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Password reset successful" },
          },
        },
      },

      // ================= URL =================

      "/api/v1/urls": {
        post: {
          tags: ["URLs"],
          summary: "Create short URL",
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    originalUrl: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: {
              description: "URL created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/URL" },
                },
              },
            },
          },
        },

        get: {
          tags: ["URLs"],
          summary: "Get all user URLs",
          security: [{ bearerAuth: [] }],
          responses: {
            200: {
              description: "List of URLs",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: { $ref: "#/components/schemas/URL" },
                  },
                },
              },
            },
          },
        },
      },

      "/api/v1/urls/{id}": {
        delete: {
          tags: ["URLs"],
          summary: "Delete URL",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "URL deleted" },
          },
        },
      },

      // ================= ANALYTICS =================

      "/api/v1/analytics/{id}": {
        get: {
          tags: ["Analytics"],
          summary: "Get analytics for URL",
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: {
              description: "Analytics data",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/Analytics" },
                },
              },
            },
          },
        },
      },

      // ================= REDIRECT =================

      "/{shortCode}": {
        get: {
          tags: ["Redirect"],
          summary: "Redirect to original URL",
          parameters: [
            {
              name: "shortCode",
              in: "path",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            302: { description: "Redirect" },
          },
        },
      },

      // ================= HEALTH =================

      "/api/v1/healthcheck": {
        get: {
          tags: ["Health"],
          summary: "Health check",
          responses: {
            200: { description: "Server running" },
          },
        },
      },
    },
  },

  apis: [],
};

export default swaggerJSDoc(options);
