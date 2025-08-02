namespace LibraryManagementSystem.Models;
public struct Member
{
  public int mid { get; set; }
  public string? name { get; set; }
  public string? surname { get; set; }
  public string? email { get; set; }
  public string? password { get; set; }
  public DateTime birthdate { get; set; }
  public string? phone { get; set; }
  public string? address { get; set; }

  public Member(int mid, string name, string surname, string email, string phone)
  {
    this.mid = mid;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.password = password;
    this.birthdate = birthdate;
    this.phone = phone;
    this.address = address;
  }

}

