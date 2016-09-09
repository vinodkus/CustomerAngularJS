using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PagingInAngularJS.Controllers
{
    public class DataController : Controller
    {
        // GET: Data
        public ActionResult Customers()
        {
            return View();
        }
        public JsonResult GetCustomerList()
        {
            var customers =new List<Customer>{};
            using(TestDBContext db = new TestDBContext())
            {
                customers = db.Customers.ToList();   
            }
            //return new JsonResult( Data customers, JsonRequestBehavior.AllowGet) ;
            return new JsonResult { Data = customers, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult FindCustomer(int customerID)
        {
            Customer customer;
            using (TestDBContext db = new TestDBContext())
            {
                customer = db.Customers.Where(xx => xx.CustomerID == customerID).First();
            }
            return new JsonResult { Data = customer, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult DeleteCustomer(int customerID)
        {
            Customer customer;
            int result = 0;
            using (TestDBContext db = new TestDBContext())
            {
                customer = db.Customers.Where(xx => xx.CustomerID == customerID).First();
                db.Customers.Remove(customer);
                result= db.SaveChanges();
            }
            return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult UpdateCustomer(int customerID, string compName, string contactName, string title, string address, string city, string region, string postalCode, string country, string phone, string fax, DateTime dob)
        {
            //var customer;
            int result;
            using (TestDBContext db = new TestDBContext())
            {
               var customer = from c in db.Customers where c.CustomerID == customerID select c;
                foreach(var c in customer)
                {
                    c.CompanyName = compName;
                    c.ContactName = contactName;
                    c.ContactTitle = title;
                    c.Address = address;
                    c.City = city;
                    c.Region = region;
                    c.PostalCode = postalCode;
                    c.Country = country;
                    c.Phone = phone;
                    c.Fax = fax;
                    c.DOB = dob;
                }
                result= db.SaveChanges();                    
            }
            return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
        [HttpPost]
        public JsonResult SaveCustomerList(string compName, string contactName, string title, string address, string city, string region, string postalCode, string country, string phone, string fax, DateTime dob)
        {
            int result = 0; ;
            using (TestDBContext db = new TestDBContext())
            {
                db.Customers.Add(new Customer() {                    
                    CompanyName=compName, 
                    ContactName=contactName,
                    ContactTitle=title,
                    Address=address,
                    City=city,
                    Region=region,
                    PostalCode=postalCode,
                    Country=country,
                    Phone=phone,
                    Fax=fax,
                    DOB=dob
                });
                try
                {
                    result = db.SaveChanges();
                }
                catch (DbEntityValidationException ex)
                {
                    foreach (var entityValidationErrors in ex.EntityValidationErrors)
                    {
                        foreach (var validationError in entityValidationErrors.ValidationErrors)
                        {
                            Response.Write("Property: " + validationError.PropertyName + " Error: " + validationError.ErrorMessage);
                        }
                    }
                }
            }
            return new JsonResult { Data = result, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}