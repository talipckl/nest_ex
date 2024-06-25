BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [email] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[BookMark] (
    [id] INT NOT NULL IDENTITY(1,1),
    [title] NVARCHAR(1000),
    [created_at] DATETIME2 NOT NULL,
    [updated_at] DATETIME2 NOT NULL,
    CONSTRAINT [BookMark_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
