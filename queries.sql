-- Database Queries

-- Find all customers with postal code 1010
Select * from Customers where PostalCode = '1010'
-- Find the phone number for the supplier with the id 11
Select Phone from Suppliers where SupplierId ="11" -> (010) 9984510
-- List first 10 orders placed, sorted descending by the order date
Select * from Orders Order By OrderDate desc limit 10
-- Find all customers that live in London, Madrid, or Brazil
Select * from Customers where City = 'London' OR City='Madrid' or Country='Brazil'
-- Add a customer record for "The Shire", the contact name is "Bilbo Baggins" the address is -"1 Hobbit-Hole" in "Bag End", postal code "111" and the country is "Middle Earth"
Insert into Customers (CustomerName, ContactName, Address, City,PostalCode,  Country)
values("The Shire", "Bilbo Baggins", "1 Hobbit-Hole", "Bag End", "111", "Middle Earth")
-- Update Bilbo Baggins record so that the postal code changes to "11122"
update Customers set PostalCode = "11122" where ContactName = "Bilbo Baggins"
-- (Stretch) Find a query to discover how many different cities are stored in the Customers table. Repeats should not be double counted
SELECT distinct City FROM Customers 
-- (Stretch) Find all suppliers who have names longer than 20 characters. You can use `length(SupplierName)` to get the length of the name
select * from Suppliers where length(SupplierName)>20