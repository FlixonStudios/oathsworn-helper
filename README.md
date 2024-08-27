
https://askubuntu.com/questions/1403508/access-a-web-application-running-in-ubuntu-wsl-from-another-pc-on-the-network/1403545#1403545

https://learn.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse?tabs=gui&pivots=windows-server-2025



New-NetFirewallRule -DisplayName 8081 -Direction Inbound -LocalPort 8081 -Protocol TCP -Action Allow
# Set DisplayName to whatever you need to remember it


Remove-NetFirewallRule -DisplayName 8081


ssh -fN -R 8081:localhost:8081 $(hostname).local

nc -zv "$(hostname).local" 8081