from django.shortcuts import render,redirect
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_protect




def benefits(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        return render(request,"presentation-benefits.html",{'desktop_version':False})
    else:
        return render(request,"presentation-benefits.html",{'desktop_version':True})


def spectrum(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        return render(request,"presentation-spectrum.html",{'desktop_version':False})
    else:
        return render(request,"presentation-spectrum.html",{'desktop_version':True})



def mobile(request):
    return render(request,"presentation-index-mobi.html",{'desktop_version':False})


def home_2d(request):
        return render(request,"presentation-index-2d.html",{'desktop_version':True})


def home(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        return render(request,"presentation-index-mobi.html",{'desktop_version':False})
    else:
        return render(request,"presentation-index.html",{'desktop_version':True})


def tech_smartpdu(request):
    return render(request,"presentation-tech-smartpdu.html",{})


def buy(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        return render(request,"presentation-buynow.html",{'desktop_version':False})
    else:
        return render(request,"presentation-buynow.html",{'desktop_version':True})

def contact(request):
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        return render(request,"presentation-contact.html",{'desktop_version':False})
    else:
        return render(request,"presentation-contact.html",{'desktop_version':True})


@csrf_protect
def contact_submit(request):
    # sales type contact!
    if request.POST["type"] == "sales":
        subject = "Website Sales Request"
        recipients = ['sales@del9.biz'];
    else:
        subject = "Website Contact Request"
        recipients = ['contact@del9.biz'];
    sender = request.POST["name"]+" <"+request.POST["email"]+" >"
    message = "****WEBSITE SALES CONTACT ****\n"+"CONTACT NAME: "+request.POST["name"]+"\nPRONOUNS: "+request.POST["pronouns"]+"\nEMAIL: "+request.POST["email"]+"\nPHONE:"+request.POST["phone"]+"\n********\nMESSAGE:\n\n"
    message = message+request.POST["message"]+"\n*******"
    send_mail(subject, message, sender, recipients)
    if (request.META['HTTP_HOST'] == "m.del9.biz"):
        return render(request,"presentation-contact-ok.html",{'desktop_version':False})
    else:
        return render(request,"presentation-contact-ok.html",{'desktop_version':True})
