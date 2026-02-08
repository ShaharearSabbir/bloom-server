-- This is an empty migration.
-- ... existing Prisma generated code ...

-- 1. Create the Function
CREATE OR REPLACE FUNCTION update_tutor_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'DELETE') THEN
        UPDATE "Tutor"
        SET 
            "avgRating" = COALESCE((SELECT AVG(rating) FROM "Review" WHERE "tutorId" = OLD."tutorId"), 0),
            "reviewCount" = (SELECT COUNT(*) FROM "Review" WHERE "tutorId" = OLD."tutorId")
        WHERE "userId" = OLD."tutorId";
        RETURN OLD;
    ELSE
        UPDATE "Tutor"
        SET 
            "avgRating" = COALESCE((SELECT AVG(rating) FROM "Review" WHERE "tutorId" = NEW."tutorId"), 0),
            "reviewCount" = (SELECT COUNT(*) FROM "Review" WHERE "tutorId" = NEW."tutorId")
        WHERE "userId" = NEW."tutorId";
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- 2. Create the Trigger
CREATE TRIGGER trg_update_tutor_stats
AFTER INSERT OR UPDATE OR DELETE ON "Review"
FOR EACH ROW
EXECUTE FUNCTION update_tutor_stats();