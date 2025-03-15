CREATE TABLE [dbo].[product] (
    [pId]    INT            IDENTITY (1, 1) NOT NULL,
    [cid]    INT            NULL,
    [title]  VARCHAR (300)  NULL,
    [detail] VARCHAR (500)  NULL,
    [price]  DECIMAL (6, 2) NULL,
    CONSTRAINT [PK_product] PRIMARY KEY CLUSTERED ([pId] ASC)
);

CREATE TABLE [dbo].[category] (
    [cId]    INT          IDENTITY (1, 1) NOT NULL,
    [name]   VARCHAR (50) NULL,
    [status] TINYINT      CONSTRAINT [DEFAULT_category_status] DEFAULT ((1)) NULL,
    CONSTRAINT [PK_category] PRIMARY KEY CLUSTERED ([cId] ASC)
);