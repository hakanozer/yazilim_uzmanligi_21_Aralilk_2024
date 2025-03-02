-- insert -> data ekleme -1
INSERT into 
users([name], surname, email, phone, [password], savedate, [status] )
VALUES('Ali', 'Bilmem', 'ali1@mail.com', 5435556678, '12345', GETDATE(), 1 )